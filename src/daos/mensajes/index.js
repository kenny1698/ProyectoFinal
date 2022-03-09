import { MongoClient } from 'mongodb'

import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'
import ContenedorMongoDb from '../../contenedores/contenedorMongoDb.js'
import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

import config from '../../config.js'

let mensajesDao
switch (config.env.method) {
    case 'json':
        mensajesDao = new ContenedorArchivo(config.fileSystem.path)
        break
    case 'firebase':
        mensajesDao = new ContenedorFirebase()
        break
    case 'mongodb':
        const uri = config.mongodb.cnxStr
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        const dbMensajes = client.db("ecommerce").collection("chat")
        mensajesDao = new ContenedorMongoDb(dbMensajes)
        break
    default:
        mensajesDao = new ContenedorMemoria()
}

export function getMensajesDao() {
    return mensajesDao
}
