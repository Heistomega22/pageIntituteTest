import { fbdbcnn } from "../../../../database/connection/dbcfb.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export class UserService {
    constructor() {
        this.db = fbdbcnn;
        this.groups = ['testers', 'alumnos', 'profesores'];
    }

    getGroupName(grupoId) {
        switch (grupoId) {
            case 0: return 'testers';
            case 1: return 'alumnos';
            case 2: return 'profesores';
            default: throw new Error("Invalid group ID");
        }
    }

    async updateUserIndex(sessionId, group, uid, extra = {}) {
        const idxRef = ref(this.db, `users_index/${sessionId}`);
        await set(idxRef, { group, uid, updatedAt: Date.now(), ...extra });
    }

    async createUser(user, grupoId, sessionId) {
        if (typeof grupoId !== 'number' || grupoId < 0 || grupoId > 2) {
            throw new Error("Invalid group ID");
        }

        const group = this.getGroupName(grupoId);
        const key = sessionId.toString();
        const userRef = ref(this.db, `users/${group}/${key}`);

        const userData = {
            nombre: user.getNombre(),
            segundoNombre: user.getSegundoNombre() || "",
            apellido: user.getApellido(),
            segundoApellido: user.getSegundoApellido() || "",
            email: user.getEmail(),
            dni: user.getDNI(),
            password: user.getPassword(),
            cursos: user.getCursos() || null,
            group: group,
            createdAt: Date.now()
        };

        await set(userRef, userData);
        await this.updateUserIndex(sessionId, group, user.dni);
        return { ok: true, sessionId, group };
    }

    async getUserByIndex(dni, grupoId) {
        const group = this.getGroupName(grupoId);
        const userRef = ref(this.db, `users/${group}/${dni}`);
        const snapshot = await get(userRef);
        return snapshot.exists() ? snapshot.val() : null;
    }

    async getUser(sessionId) {
        const key = sessionId.toString();
        const idxSnap = await get(ref(this.db, `users_index/${key}`));
        if (idxSnap.exists()) {
            const idx = idxSnap.val();
            const group = idx.group;
            const uid = idx.uid || key;
            const snap = await get(ref(this.db, `users/${group}/${uid}`));
            if (snap.exists()) return snap.val();
        }

        for (const group of this.groups) {
            const snap = await get(ref(this.db, `users/${group}/${key}`));
            if (snap.exists()) {
                await this.updateUserIndex(key, group, key);
                return snap.val();
            }
        }

        return null;
    }
}
