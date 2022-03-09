import MensajesRepo from '../repositorios/MensajesRepo.js'
import { asViewModels, asModel } from '../mappers/mensajesMapper.js'
import { normalizarMensajes } from '../normalizacion/index.js'
import { generarId } from '../identificadores/index.js'

const mensajesRepo = new MensajesRepo()

class MensajesApi {
    #mensajesRepo

    constructor() {
        this.#mensajesRepo = mensajesRepo
    }

    async guardar(datos) {
        datos.id = generarId('mensaje')
        const mensaje = asModel(datos)
        return await this.#mensajesRepo.guardar(mensaje)
    }

    async listarAll() {
        const mensajes = await this.#mensajesRepo.listarAll()
        const vms = asViewModels(mensajes)
        const normalizados = normalizarMensajes(vms)
        return normalizados
    }
}

const mensajesApi = new MensajesApi()

export default mensajesApi