import { SessionController } from "../controllers/sessionController.js";


document.addEventListener("DOMContentLoaded", async () => {
    const btnLogout = document.getElementById("if-logout");
    const btnLogin = document.getElementById("if-login");
    const logoutBtn = document.getElementById("logoutBtn");
    const cursosLink = document.getElementById("cursosLink");
    const sessionController = new SessionController();


    await sessionController.waitForAuthUser();


    const activeSession = await sessionController.getActiveSession();


    if (activeSession) {
        btnLogout.style.display = "none";
        btnLogin.style.display = "block";
        cursosLink.href = "/apps/frontend/public/home/alumnos/cursos/miscursos.html";
        cursosLink.style.display = "block";
        sessionController.algo();
    } else {
        btnLogout.style.display = "block";
        btnLogin.style.display = "none";
        cursosLink.style.display = "none";
        console.log("Sesión inactiva");
    }


    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await sessionController.logout();
                window.location.href = "/apps/frontend/public/home/main/index.html";
            } catch (err) {
                console.error("Error during logout:", err);
            }
        });
    }

});