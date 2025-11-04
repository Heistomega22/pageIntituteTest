import { fbdbcnn } from "/database/connection/dbcfb.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
  const auth = getAuth();
  const db = fbdbcnn;
  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      loadUserCourses(user.uid);
    } else {
      window.location.href = "/apps/frontend/public/home/main/index.html";
    }
  });

  async function loadUserCourses(userId) {
    try {
      const dbRef = ref(db);
      const cursosSnapshot = await get(child(dbRef, `users/alumnos/${userId}/cursos`));
      const cursos = cursosSnapshot.val();
      const container = document.getElementById('courses-list');
      
      if (!cursos || Object.keys(cursos).length === 0) {
        container.innerHTML = '<div class="no-courses">No tienes cursos disponibles.</div>';
        return;
      }

      container.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'courses-grid';

      // Cargar información de todos los cursos en paralelo
      const cursoPromises = Object.keys(cursos).map(async (cursoId) => {
        const cursoSnap = await get(child(dbRef, `cursos_index/${cursoId}`));
        return {
          id: cursoId,
          nombre: cursoSnap.exists() ? cursoSnap.val().nombre : 'Curso desconocido',
          datos: cursos[cursoId],
          descripcion: cursoSnap.exists() ? cursoSnap.val().descripcion || '' : '',
          imagen: cursoSnap.exists() && cursoSnap.val().imagen 
        };
      });

      const cursosCompletos = await Promise.all(cursoPromises);
      
      cursosCompletos.forEach(curso => {
        const card = createCourseCard(curso);
        grid.appendChild(card);
      });

      container.appendChild(grid);
      attachCourseClickHandlers();

    } catch (error) {
      console.error('Error loading courses:', error);
      document.getElementById('courses-list').innerHTML = 
        '<div class="error">Error al cargar los cursos</div>';
    }
  }

  function createCourseCard(curso) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.setAttribute('data-course-id', curso.id);
    
    const progresoText = curso.datos && typeof curso.datos.progreso === 'number' 
      ? `<div class="course-progress">${curso.datos.progreso}% completado</div>`
      : '';

    card.innerHTML = `
      <div class="course-card-header">
        <img src="${curso.imagen}" alt="${curso.nombre}" class="course-image">
      </div>
      <div class="course-card-body">
        <div class="course-title">${curso.nombre}</div>
        ${curso.descripcion ? `<div class="course-description">${curso.descripcion}</div>` : ''}
        ${progresoText}
      </div>
    `;
    
    return card;
  }

  function attachCourseClickHandlers() {
    const container = document.getElementById('courses-list');
    container.addEventListener('click', (e) => {
      const courseCard = e.target.closest('.course-card');
      if (courseCard) {
        const courseId = courseCard.getAttribute('data-course-id');
        const courseName = courseCard.querySelector('.course-title')?.textContent || '';
        if (courseId) {
          navigateToCourse(courseId, courseName);
        }
      }
    });
  }

  function navigateToCourse(courseId, courseName) {
    window.location.href = `/apps/frontend/public/home/alumnos/cursos/${courseId}/index.html?id=${encodeURIComponent(courseId)}`;
  }

  async function getCursoByID(courseId) {
    const dbRef = ref(db);
    const cursoSnap = await get(child(dbRef, `cursos_index/${courseId}`));
    return cursoSnap.exists() ? cursoSnap.val().nombre : null;
  }


});
