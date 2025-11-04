import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, onIdTokenChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, set, update, get, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { fbdbcnn } from "../../../../database/connection/dbcfb.js";

const HB_INTERVAL_MS = 30 * 1000;
const SESSION_TTL_MS = 10 * 60 * 1000;

export class SessionController {
  constructor() {
    this.auth = getAuth();
    this.db = fbdbcnn;
    this.sessionId = null;
    this.uid = null;
    this.hbTimer = null;
    this.onAuthUnsub = null;
    this.onIdTokenUnsub = null;
  }

  async login(email, password) {
    const userCred = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCred.user;

    this.sessionId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${user.uid}-${Date.now()}`;
    this.uid = user.uid;

    console.log("UID after login:", this.uid);
    await this.linkSessionToUserIndex(this.uid);
    await this._createSessionRecord();
    this._startHeartbeat();
    return user;
  }

  async logout() {
    try {
      this._stopHeartbeat(); 
      if (this.uid && this.sessionId) {
        const sessionRef = ref(this.db, `sessions/${this.uid}/${this.sessionId}`);
        await update(sessionRef, { active: false, endedAt: Date.now() });
      }
      await signOut(this.auth);
    } finally {
      this.uid = null;
      this.sessionId = null;
    }
  }

  async _createSessionRecord() {
    const ua = navigator.userAgent || 'unknown';
    const lang = navigator.language || navigator.userLanguage || null;
    const now = Date.now();

    const sessionRef = ref(this.db, `sessions/${this.uid}/${this.sessionId}`);
    await set(sessionRef, {
      sessionId: this.sessionId,
      uid: this.uid,
      userAgent: ua,
      language: lang,
      ip: null,
      createdAt: now,
      lastActive: now,
      active: true
    });

    localStorage.setItem('activeSession', JSON.stringify({ uid: this.uid, sessionId: this.sessionId }));
  }

  _startHeartbeat() {
    if (this.hbTimer) return;
    this.hbTimer = setInterval(() => this._heartbeat(), HB_INTERVAL_MS);
    this._heartbeat();
  }
  
  _stopHeartbeat() {
    if (this.hbTimer) {
      clearInterval(this.hbTimer);
      this.hbTimer = null;
    }
    localStorage.removeItem('activeSession');
  }

  async getActiveSession() {
    try {
      const raw = localStorage.getItem('activeSession');
      if (!raw) return null;
      const { uid, sessionId } = JSON.parse(raw);
      if (!uid || !sessionId) return null;
      const currentUser = this.auth.currentUser;
      if (!currentUser || currentUser.uid !== uid) return null;

      const sessionRef = ref(this.db, `sessions/${uid}/${sessionId}`);
      const snap = await get(sessionRef);
      if (!snap.exists()) return null;
      const sessionData = snap.val();
      if (sessionData.active !== true) return null;

      this.uid = uid;
      this.sessionId = sessionId;
      this._startHeartbeat();
      return sessionData;
    } catch (err) {
      console.error("getActiveSession:", err);
      return null;
    }
  }

  algo() 
  {
    console.log("Esto es un método de prueba.", this.uid, this.sessionId);
  }

  async _heartbeat() {
    if (!this.uid || !this.sessionId) return;
    const sessionRef = ref(this.db, `sessions/${this.uid}/${this.sessionId}`);
    try {
      await update(sessionRef, { lastActive: Date.now(), active: true });
    } catch (err) {
      console.warn("Heartbeat failed:", err);
    }
  }

  async restoreLocalSession() {
    try {
      const raw = localStorage.getItem('activeSession');
      if (!raw) return false;
      const { uid, sessionId } = JSON.parse(raw);
      if (!uid || !sessionId) return false;
      const currentUser = this.auth.currentUser;
      if (!currentUser || currentUser.uid !== uid) return false;

      this.uid = uid;
      this.sessionId = sessionId;
      this._startHeartbeat();
      return true;
    } catch (err) {
      console.error("restoreLocalSession:", err);
      return false;
    }
  }

  async listActiveSessionsForCurrentUser() {
    if (!this.auth.currentUser) throw new Error("Not authenticated");
    const uid = this.auth.currentUser.uid;
    const snap = await get(ref(this.db, `sessions/${uid}`));
    if (!snap.exists()) return {};
    const all = snap.val();
    const now = Date.now();
    const filtered = {};
    for (const [sid, s] of Object.entries(all)) {
      const isActive = s.active && (now - (s.lastActive || 0) < SESSION_TTL_MS);
      if (isActive) filtered[sid] = s;
    }
    return filtered;
  }

  async endSession(uid, sessionId) {
    if (!uid || !sessionId) throw new Error("uid and sessionId required");
    const sessionRef = ref(this.db, `sessions/${uid}/${sessionId}`);
    await update(sessionRef, { active: false, endedAt: Date.now() });
  }

  attachAuthListener() {
    if (this.onAuthUnsub) return;
    this.onAuthUnsub = onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const restored = await this.restoreLocalSession();
        if (!restored) {
          this.uid = user.uid;
          this.sessionId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${user.uid}-${Date.now()}`;
          await this._createSessionRecord();
          this._startHeartbeat();
        }
      } else {
        this._stopHeartbeat();
        this.uid = null;
        this.sessionId = null;
      }
    });
  }

  detachAuthListener() {
    if (this.onAuthUnsub) { this.onAuthUnsub(); this.onAuthUnsub = null; }
  }

  async linkSessionToUserIndex(userId) {
    if (this.uid == null || this.sessionId == null || this.uid == '' || this.sessionId == '') throw new Error("No active session to link");
    const userIndexRef = ref(this.db, `users_index/${userId}/activeSession`);
    await set(userIndexRef, {
      sessionId: this.sessionId,
      linkedAt: Date.now(),
      active: true,
      uid: this.uid
    });
  }

  async getUserFromSessionToken(uid) {
    const userIndexRef = ref(this.db, `users_index/${uid}`);
    const userSnap = await get(userIndexRef);
    return userSnap.exists() ? userSnap.val() : null;
  }
  
  // 2 horas porque no funcionaba y era esto lo que faltaba
  async waitForAuthUser(timeout = 3000) {
    const start = Date.now();
    while (!this.auth.currentUser) {
      if (Date.now() - start > timeout) break;
      await new Promise(res => setTimeout(res, 100));
    }
    return this.auth.currentUser;
  }

  async deleteAllSessions() {
    const sessionsRef = ref(this.db, `sessions`);
    const sessionsSnap = await get(sessionsRef);
    if (!sessionsSnap.exists()) return;

    const now = Date.now();
    const updates = {};
    sessionsSnap.forEach(userSnap => {
      const uid = userSnap.key;
      userSnap.forEach(sessionSnap => {
        const sessionData = sessionSnap.val();
        const lastActive = sessionData.lastActive || 0;
        const isActive = sessionData.active && (now - lastActive < SESSION_TTL_MS);
        if (!isActive) {
          updates[`sessions/${uid}/${sessionSnap.key}`] = null;
        }
      });
    });

    if (Object.keys(updates).length > 0) {
      await update(ref(this.db), updates);
    }
  }

  async deleteInactiveSessions() {
    if (!this.auth.currentUser) throw new Error("Not authenticated");
    const uid = this.auth.currentUser.uid;

    // Obtener el sessionId actual desde users_index/uid/activeSession/sessionId
    const userIndexRef = ref(this.db, `users_index/${uid}/activeSession`);
    const userIndexSnap = await get(userIndexRef);
    if (!userIndexSnap.exists()) return;

    const activeSessionData = userIndexSnap.val();
    const activeSessionId = activeSessionData.sessionId;

    // Obtener todas las sesiones del usuario
    const sessionsRef = ref(this.db, `sessions/${uid}`);
    const sessionsSnap = await get(sessionsRef);
    if (!sessionsSnap.exists()) return;

    const sessions = sessionsSnap.val();
    if (!sessions) return;

    // Eliminar todas las sesiones que no sean la actual
    for (const sessionKey in sessions) {
      if (sessionKey !== activeSessionId) {
        await remove(ref(this.db, `sessions/${uid}/${sessionKey}`));
      }
    }
  }

}
