import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

const ordenes = mongoose.model ('ordenes', {
    producto: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    cantidad: { type: Number, required: true },
    numorden: { type: String, required: true },
    fecha: { type: String, required: true },
    estado: { type: String, required: true },
    email: { type: String, required: true }
})

export default ordenes 