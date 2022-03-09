export default class Carritos {
    constructor(id, { id, email, fecha, producto, cantidad, direccion }) {
        this.id = id
        this.email = email
        this.fecha = fecha
        this.producto = producto
        this.cantidad= cantidad
        this.direccion = direccion
    }
}