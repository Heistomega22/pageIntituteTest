export class DivDropdown {
    constructor(id, titulo, detalles) {
        this.id = id;
        this.titulo = titulo;
        this.detalles = detalles;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDetalles() {
        return this.detalles;
    }

    setDetalles(detalles) {
        this.detalles = detalles;
    }

    

}