import { Router } from 'express';
import productoApi from '../../api/producto.js'
import jwt from '../../jwt.js'
import moment from 'moment'
import multer from 'multer'
import config from '../../config.js'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./images/')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
  })

const upload = multer({storage})

const productosRouter = Router()

productosRouter.get('/',  async (req, res) => {
     let productos = await productoApi.listarAll()
     let usuarioActual = req.session.user
     res.json({usuarioActual,productos})
})

productosRouter.get('/:categoria', async (req, res) => {
    const productos = await productoApi.listarCategoria(req.body.categoria)
    return res.render('tabla-productos', {productos})
})

productosRouter.post('/', upload.single('foto'), async (req, res) => {
    if (req.query.usuario == config.usuarioAdmin && req.query.pass == config.passAdmin){
        //////////////////// Crea Producto ////////////////////
        let fecha = moment().format("DD/MM/YYYY HH:mm:ss")
        console.log(req.file)
        if( req.file)
            req.body.foto = req.file.originalname 
        let prodAgregado = await productoApi.guardar(req.body)
        let productos = await productoApi.listarAll()
        return res.render('productos', { productos})
    }else{
        return res.render('error',{
            error: 'Operacion no valida',
            detalle: 'Requiere usuario admin para esta Operacion'
          })
    }
})

productosRouter.put('/:id', async (req, res) => {
    if (req.query.usuario == config.usuarioAdmin && req.query.pass == config.passAdmin){
        const prodActualizado = await productoApi.actualizar(req.body.id,req.body)
        res.json(prodActualizado)
    }else{
        return res.render('error',{
        error: 'Operacion no valida',
        detalle: 'Requiere usuario admin para esta Operacion'
        })
    }
})

productosRouter.delete('/:id', async (req, res) => {
    if (req.query.usuario == config.usuarioAdmin && req.query.pass == config.passAdmin){
        const prodEliminado = await productoApi.borrar(req.body.id)
        res.json(prodEliminado)
    }else{
        return res.render('error',{
        error: 'Operacion no valida',
        detalle: 'Requiere usuario admin para esta Operacion'
        })
    }
})

productosRouter.delete('/', async (req, res) => {
    if (req.query.usuario == config.usuarioAdmin && req.query.pass == config.passAdmin){
        const prodEliminado = await productoApi.borrarAll()
        res.json(prodEliminado)
    }else{
        return res.render('error',{
        error: 'Operacion no valida',
        detalle: 'Requiere usuario admin para esta Operacion'
        })
    }
})
export { productosRouter }