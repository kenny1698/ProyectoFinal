import { MongoClient } from 'mongodb'

import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'
import ContenedorMongoDb from '../../contenedores/contenedorMongoDb.js'
import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

import config from '../../config.js'

let carritosDao
switch (config.env.method) {
    case 'json':
        carritosDao = new ContenedorArchivo(config.fileSystem.path)
        break
    case 'firebase':
        carritosDao = new ContenedorFirebase()
        break
    case 'mongodb':
        const uri = config.mongodb.cnxStr
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        const dbMensajes = client.db("ecommerce").collection("carritos")
        carritosDao = new ContenedorMongoDb(dbMensajes)
        break
    default:
        carritosDao = new ContenedorMemoria()
}

export function getCarritosDao() {
    return carritosDao
}

