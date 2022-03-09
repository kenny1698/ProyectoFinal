class ContenedorMongoDb {

    constructor(coleccion) {
        this.coleccion = coleccion
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.findOne({ id }, { _id: 0, __v: 0 })
            if (!doc) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                return doc
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listarNombre(nombre) {
        try {
            const doc = await this.coleccion.find({nombre}).toArray()
            if (!doc) {
                throw new Error('Error al listar por categoria: no encontrado')
            } else {
                return doc
            }
        } catch (error) {
            throw new Error(`Error al listar por categoria: ${error}`)
        }
    }

    async listarCategoria(categoria) {
        try {
            const doc = await this.coleccion.find({categoria}).toArray()
            if (!doc) {
                throw new Error('Error al listar por categoria: no encontrado')
            } else {
                return doc
            }
        } catch (error) {
            throw new Error(`Error al listar por categoria: ${error}`)
        }
    }

    async listarAll(query = {}) {
        try {
            let docs = await this.coleccion.find(query, { _id: 0, __v: 0 }).toArray()
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            const elems = await this.listarAll()
            let doc = await this.coleccion.insertOne(nuevoElem);
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(id, elem) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            try {
                let doc = await this.coleccion.updateOne({ id: id }, elem)
                return doc
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongoDb