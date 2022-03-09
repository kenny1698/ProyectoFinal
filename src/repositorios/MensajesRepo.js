import { asDto, asModels } from '../mappers/mensajesMapper.js'
import { getMensajesDao } from '../daos/mensajes/index.js'

export default class MensajesRepo {
    #mensajesDao

    constructor() {
        this.#mensajesDao = getMensajesDao()
    }

    async listarAll() {
        const dtos = await this.#mensajesDao.listarAll()
        const mensajes = asModels(dtos)
        return mensajes
    }

    async guardar(mensaje) {
        const dto = asDto(mensaje)
        return await this.#mensajesDao.guardar(dto)
    }
}