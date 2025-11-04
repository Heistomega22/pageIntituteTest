import { SessionController } from "../controllers/sessionController.js";
import { fbdbcnn } from "/database/connection/dbcfb.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const auth = getAuth();
  const db = fbdbcnn;
  const session = new SessionController();

  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const uidEl = document.getElementById('profile-uid');
  const coursesListEl = document.getElementById('profile-courses-list');

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "/apps/frontend/public/home/main/index.html";
      return;
    }
    emailEl.textContent = user.email || 'Sin email';
    uidEl.textContent = user.uid;

    // Cargar cursos del usuario
    const dbRef = ref(db);
    const cursosSnap = await get(child(dbRef, `users/alumnos/${user.uid}/cursos`));
    const usrDta = await get(child(dbRef, `users/alumnos/${user.uid}/nombre`));
    // obtener el nombre del usuario
    const usrName = usrDta.exists() ? usrDta.val() : 'Sin nombre';
    nameEl.textContent = usrName;

    const cursos = cursosSnap.exists() ? cursosSnap.val() : {};
    coursesListEl.innerHTML = '';
    const cursoIds = Object.keys(cursos);
    if (cursoIds.length === 0) {
      coursesListEl.innerHTML = '<li>No tienes cursos asignados.</li>';
      return;
    }
    // Obtener nombre de cada curso
    await Promise.all(cursoIds.map(async (cursoId) => {
      const cursoSnap = await get(child(dbRef, `cursos_index/${cursoId}`));
      const nombre = cursoSnap.exists() ? cursoSnap.val().nombre : 'Curso desconocido';
      let yearText = '';
      if (cursos[cursoId] && cursos[cursoId].año) {
        yearText = cursos[cursoId].año + '° Año';
      }
      let progresoText = '';
      if (cursos[cursoId] && typeof cursos[cursoId].progreso === 'number') {
        progresoText = ` (${cursos[cursoId].progreso}% completado)`;
      }
      const li = document.createElement('li');
      li.textContent = `${nombre} ${yearText}${progresoText}`;
      coursesListEl.appendChild(li);
    }));
  });
});
