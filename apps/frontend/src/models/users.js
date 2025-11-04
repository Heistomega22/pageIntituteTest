export class User {
    constructor(_grupoId, _nombre, _apellido, _email, _dni, _password, _cursos = []) {
        this.grupoId = _grupoId;
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.email = _email;
        this.dni = _dni;
        this.password = _password;
        this.cursos = [];
    }

    getGrupoId() { return this.grupoId; }
    setGrupoId(grupoId) { this.grupoId = grupoId; }

    getNombre() { return this.nombre; }
    setNombre(nombre) { this.nombre = nombre; }

    getSegundoNombre() {
        const nombres = this.nombre.split(' ');
        return nombres.length > 1 ? nombres[1] : '';
    }

    getApellido() { return this.apellido; }
    setApellido(apellido) { this.apellido = apellido; }

    getSegundoApellido() {
        const apellidos = this.apellido.split(' ');
        return apellidos.length > 1 ? apellidos[1] : '';
    }

    getEmail() { return this.email; }
    setEmail(email) { this.email = email; }

    getDNI() { return this.dni; }
    setDNI(dni) { this.dni = dni; }

    getPassword() { return this.password; }
    getCursos() { return this.cursos; }

    getFullName() { return `${this.nombre} ${this.apellido}`; }
    getEmailDomain() { return this.email.split('@')[1]; }

    isValidDNI(dni) {
        if (!dni || typeof dni !== 'number' || typeof dni === 'object') return false;
        return dni.toString().length >= 8;
    }
}