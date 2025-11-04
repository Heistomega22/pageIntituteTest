import { DivDropdown } from "../models/divDropdown.js";

export function crearTarjetaCurso(divDropdown) {
    const articulo = document.createElement("article");
    articulo.classList.add("tarjeta-curso");

    // Barra sup
    const barSecSup = document.createElement("div");
    barSecSup.classList.add("barra-seccion-superior");
    barSecSup.style.display = "flex";
    barSecSup.style.justifyContent = "space-between";
    barSecSup.style.alignItems = "center";

    // Titulo a la izq
    const titulo = document.createElement("h2");
    titulo.textContent = divDropdown.getTitulo();
    titulo.style.margin = "0";

    // Btn derecha
    const btnToggle = document.createElement("button");
    btnToggle.textContent = "Ver detalles";
    btnToggle.classList.add("btn-toggle-detalles");
    btnToggle.style.marginLeft = "auto";

    barSecSup.appendChild(titulo);
    barSecSup.appendChild(btnToggle);
    articulo.appendChild(barSecSup);

    const rectaguloDesplegableSecInferior = document.createElement("div");
    rectaguloDesplegableSecInferior.classList.add("rectangulo-desplegable-seccion-inferior");
    rectaguloDesplegableSecInferior.style.display = "none";  // no mostrar

    const detalles = document.createElement("div");
    detalles.classList.add("contenido-curso");
    detalles.textContent = divDropdown.getDetalles();
    rectaguloDesplegableSecInferior.appendChild(detalles);

    articulo.appendChild(rectaguloDesplegableSecInferior);
     // desplear/ocultar detalles de la actividad
    btnToggle.addEventListener("click", () => {
        const visible = rectaguloDesplegableSecInferior.style.display === "block";
        rectaguloDesplegableSecInferior.style.display = visible ? "none" : "block";
        btnToggle.textContent = visible ? "Ver detalles" : "Ocultar detalles";
    });

    return articulo;
}

