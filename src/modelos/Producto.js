export default class Producto {
    constructor(id, { id, nombre, foto, precio, descripcion, categoria }) {
        this.id = id
        this.nombre= nombre
        this.foto= foto
        this.precio= precio
        this.descripcion= descripcion        
        this.categoria= categoria
    }
}

