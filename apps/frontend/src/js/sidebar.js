import { SessionController } from "../controllers/sessionController.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar-toggle-btn");
  const logoutBtn = document.getElementById("logoutBtn");
  const sidebar = document.getElementById("sidebar");
  const cursosLinkContainer = document.getElementById("cursosLinkContainer");

  const userStateLogin = document.getElementById("if-login");
  const userStateLogout = document.getElementById("if-logout");

  const sessionController = new SessionController();

  let sessionActive = false;
  try {
    const session = await sessionController.restoreLocalSession();
    if (session) {
      sessionActive = true;
    } else {
      sessionActive = false;
    }
  } catch (err) {
    console.warn("No se pudo comprobar sesión activa:", err);
    sessionActive = false;
  }

  // Mostrar/ocultar 
  function updateUiBySession(active) {
    // 
    if (userStateLogin) userStateLogin.style.display = active ? "flex" : "none";
    if (userStateLogout) userStateLogout.style.display = active ? "none" : "flex";

    // visible
    if (sidebarToggleBtn) sidebarToggleBtn.style.display = "inline-block";
    // ocultar
    if (closeSidebarBtn) closeSidebarBtn.style.display = "none";

    // ocultar
    if (sidebar) sidebar.style.display = "none";
    if (sidebar) sidebar.classList.remove("active");

    // mostrar si esta logg
    if (cursosLinkContainer) cursosLinkContainer.style.display = active ? "flex" : "none";
  }

  // Inicializa la UI lo antes posible
  updateUiBySession(sessionActive);

  // Aseguramos que SessionController gestione sus listeners/heartbeat
  sessionController.attachAuthListener();

  // Escuchar cambios de auth para mantener la UI sincronizada (maneja login y logout)
  onAuthStateChanged(getAuth(), (user) => {
    updateUiBySession(!!user);
    const profileLink = document.getElementById('profileLink');
    if (profileLink) {
      if (user) {
        profileLink.setAttribute('href', '/apps/frontend/public/home/alumnos/perfil/miprofile.html');
      } else {
        profileLink.setAttribute('href', '#miprofile');
      }
    }
  });

  // Abrir sidebar
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!sidebar) return;
      sidebar.classList.add("active");
      sidebar.style.display = "flex";
      if (closeSidebarBtn) closeSidebarBtn.style.display = "inline-block";
    });
  }

  // Cerrar sidebar
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!sidebar) return;
      sidebar.classList.remove("active");
      sidebar.style.display = "none";
      closeSidebarBtn.style.display = "none";
    });
  }

  // Cerrar al hacer click fuera del sidebar
  document.addEventListener("click", (e) => {
    if (!sidebar) return;
    const isClickInside = sidebar.contains(e.target) || (sidebarToggleBtn && sidebarToggleBtn.contains(e.target));
    if (!isClickInside && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
      sidebar.style.display = "none";
      if (closeSidebarBtn) closeSidebarBtn.style.display = "none";
    }
  });

  // Logout
  document.addEventListener("click", async (e) => {
    if (!logoutBtn) return;
    // Usar closest para capturar clicks sobre el anchor o sobre nodos hijos/texto
    const clickedLogout = (e.target && ( (e.target.id === "logoutBtn") || (e.target instanceof Element && e.target.closest && e.target.closest('#logoutBtn')) ));
    if (clickedLogout) {
      e.preventDefault();
      try {
        await sessionController.logout();
        updateUiBySession(false);
        window.location.href = "/apps/frontend/public/home/main/index.html";
      } catch (err) {
        console.error("Error during logout:", err);
      }
    }
  });

});
