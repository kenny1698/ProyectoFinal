import { MongoClient } from 'mongodb'

import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'
import ContenedorMongoDb from '../../contenedores/contenedorMongoDb.js'
import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

import config from '../../config.js'

let productosDao
switch (config.env.method) {
    case 'json':
        productosDao = new ContenedorArchivo(config.fileSystem.path)
        break
    case 'firebase':
        productosDao = new ContenedorFirebase()
        break
    case 'mongodb':
        const uri = config.mongodb.cnxStr
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        const dbMensajes = client.db("ecommerce").collection("productos")
        productosDao = new ContenedorMongoDb(dbMensajes)
        break
    default:
        productosDao = new ContenedorMemoria()
}

export function getProductosDao() {
    return productosDao
}

