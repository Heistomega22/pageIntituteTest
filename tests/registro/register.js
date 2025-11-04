import { UserService } from "/apps/frontend/src/services/userService.js";

document.getElementById("register-btn").addEventListener("click", async () => {
    const userService = new UserService();

    /* test */
    const testUser = {
        getDNI: () => 18345678,
        getGrupoId: () => 1,
        getNombre: () => "Angeles",
        getSegundoNombre: () => "-",
        getApellido: () => "HO",
        getSegundoApellido: () => "-",
        getEmail: () => "Angeles_ho@gmail.com",
        getPassword: () => "password12345",
        getCursos: () => ["cine"]
    };

    const profesor = {
        getDNI: () => 27654321,
        getGrupoId: () => 2,
        getNombre: () => "Carlos",
        getSegundoNombre: () => "-",
        getApellido: () => "Lopez",
        getSegundoApellido: () => "-",
        getEmail: () => "carlos_lopez@gmail.com",
        getPassword: () => "password54321",
        getCursos: () => ["Audio", "Cine"]
    };

    console.log("creating user");
    await userService.createUser(testUser, 1);
    await userService.createUser(profesor, 2);

    console.log("fetching user");
    const fetchedUser = await userService.getUser(18345678, 1);
    const fetchedProfesor = await userService.getUser(27654321, 2);
    console.log("Fetched User", fetchedUser);
    console.log("Fetched Profesor", fetchedProfesor);
});
