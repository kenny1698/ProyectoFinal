import { MongoClient } from 'mongodb'

import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'
import ContenedorMongoDb from '../../contenedores/contenedorMongoDb.js'
import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

import config from '../../config.js'

let ordenesDao
switch (config.env.method) {
    case 'json':
        ordenesDao = new ContenedorArchivo(config.fileSystem.path)
        break
    case 'firebase':
        ordenesDao = new ContenedorFirebase()
        break
    case 'mongodb':
        const uri = config.mongodb.cnxStr
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        const dbMensajes = client.db("ecommerce").collection("ordenes")
        ordenesDao = new ContenedorMongoDb(dbMensajes)
        break
    default:
        ordenesDao = new ContenedorMemoria()
}

export function getOrdenesDao() {
    return ordenesDao
}

