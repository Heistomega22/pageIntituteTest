import { UserService } from "../services/userService.js";
import { User } from "../models/users.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

export async function handleRegister(event) {
    event.preventDefault();

    const userService = new UserService();
    const auth = getAuth();

    const correo = document.getElementById("username").value;
    const dni = document.getElementById("dni").value;
    const password = document.getElementById("password").value;
    const tempUsr = correo.split('@')[0];

    const newuser = new User(1, tempUsr, '', correo, dni, password, []);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
        await userService.createUser(newuser, 1, userCredential.user.uid);
        window.location.href = "/apps/frontend/public/security/login/login.html";
    } catch (error) {
        console.error("Error al registrarse:", error);
        alert("Ocurrió un error al registrarse");
    }
}

document.getElementById("main-form-register").addEventListener("submit", handleRegister);
