import { UserService } from "../services/userService.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { SessionController } from "./sessionController.js";


export async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userService = new UserService();
    const auth = getAuth();
    const sessionController = new SessionController();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        if (userCredential.user) {
            await sessionController.login(username, password);
            window.location.href = "/apps/frontend/public/home/main/index.html";
        } else {
            alert("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error al iniciar sesión");
    }
}


document.getElementById("main-form-login").addEventListener("submit", handleLogin);
