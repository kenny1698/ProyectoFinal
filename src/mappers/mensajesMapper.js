import Mensaje from '../modelos/Mensaje.js'

export function asViewModel(mensaje) {
    const viewModel = {
        text: mensaje.text,
        email: mensaje.email,
        tipo: mensaje.tipo,
        fyh: mensaje.fyh,
        id: mensaje.id
    }
    return viewModel
}

export function asViewModels(models) {
    const viewModels = models.map(asViewModel)
    return viewModels
}

export function asModel(datos) {
    const mensaje = new Mensaje({ ...datos})
    return mensaje
}

export function asModels(datos) {
    const mensajes = datos.map(d => asModel(d))
    return mensajes
}

export function asDto(mensaje) {
    const dto = {
        text: mensaje.text,
        email: mensaje.email,
        tipo: mensaje.tipo,
        fyh: mensaje.fyh,
        id: mensaje.id
    }
    return dto
}
export function asDtos(mensajes) {
    const dtos = mensajes.map(d => asDto(d))
    return dtos
}