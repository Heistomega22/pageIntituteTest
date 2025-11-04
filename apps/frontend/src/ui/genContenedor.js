import { DivDropdown } from "../models/divDropdown.js";
import { crearTarjetaCurso } from "../js/cursosCont.js";
import { fbdbcnn } from "/database/connection/dbcfb.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", async () => {
    const contenedorCursos = document.getElementById("main-content-cursos");
    const contenedorActividades = document.getElementById("panelActividadesIndiv");

    const cursoId = new URLSearchParams(window.location.search).get("id");

    if (!cursoId) {
        contenedorCursos.textContent = "ID de curso no especificado.";
        return;
    }

    // Loading state
    contenedorActividades.innerHTML = "<div class='loading'>Cargando curso...</div>";

    const auth = getAuth();
    let currentUser = null;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            try {
                const dbRef = ref(fbdbcnn);
                const cursoSnap = await get(child(dbRef, `cursos_index/${cursoId}`));

                if (!cursoSnap.exists()) {
                    contenedorActividades.textContent = "Curso no encontrado.";
                    return;
                }

                const cursoData = cursoSnap.val();
                if (!cursoData.nombre) {
                    console.error("Curso sin nombre válido");
                    contenedorActividades.textContent = "Curso sin nombre válido.";
                    return;
                }

                const divDropdown = new DivDropdown(
                    cursoId,
                    cursoData.nombre,
                    cursoData.detalles || "Sin detalles disponibles."
                );

                let alamcen = [];

                // crear actividades con bucle y meterlas en el array
                for (let i = 1; i <= 5; i++) {
                    if (!cursoData[`modulo${i}`]) {
                        cursoData[`modulo${i}`] = {
                            titulo: `Módulo ${i} (sin título)`,
                            detalles: "Detalles no disponibles."
                        };
                    }
                    const divDropdown = new DivDropdown(
                        `curso-${cursoId}-mod${i}`,
                        cursoData[`modulo${i}`].titulo,
                        cursoData[`modulo${i}`].detalles
                    );
                    alamcen.push(divDropdown);
                }

                contenedorActividades.innerHTML = ""; // Quita loading
                alamcen.forEach(element => {
                    const tarjetaCurso = crearTarjetaCurso(element);
                    contenedorActividades.appendChild(tarjetaCurso);
                });

            } catch (error) {
                console.error("Error al cargar el curso:", error);
                contenedorActividades.textContent = "Error al cargar el curso.";
            }
        } else {
            window.location.href = "/apps/frontend/public/home/main/index.html";
        }
    });
});