import { Router } from 'express'
import carritosApi from '../../api/carrito.js'
import productoApi from '../../api/producto.js'
import config from '../../config.js'
import logger from '../../log4js/log4js-module.js'
import jwt from '../../jwt.js'
import moment from 'moment'
import { uid } from 'uid'
import ordenApi from '../../api/orden.js'
import orden from '../../modelos/Orden.js'
import { transporter } from '../../mail.js'

const carritosRouter = Router()

carritosRouter.get('/', jwt.auth, async (req, res) => {
    let carritos = await carritosApi.listarAll()
    let usuarioActual = req.session.user
    res.json({usuarioActual,carritos})
})

carritosRouter.get('/:id', async (req, res) => {
    const carritos = await carritosApi.listar(req.body.id);
    res.json(carritos)
})

carritosRouter.post('/', jwt.auth, async (req, res) => {
  //////////////////// Crea Carrito ////////////////////
  let usuarioActual = req.session.user
  // Comprueba si req.body no esta vacio //
  if (Object.keys(req.body).length !== 0){
    let fecha = moment().format("DD/MM/YYYY HH:mm:ss")
    req.body.fecha = fecha
    const carAgregado = await carritosApi.guardar(req.body)
  }   
    let carritos = await carritosApi.listarAll()
    return res.render('productos', { carritos})
  
})

carritosRouter.put('/:id', async (req, res) => {
    const carActualizado = await carritosApi.actualizar(req.body);
    res.json(carActualizado)
})

carritosRouter.delete('/:id', jwt.auth, async (req, res) => {
  let usuarioActual = req.session.user
  const carritos = await carritosApi.listar(req.body.id)
  let producto = await productoApi.listarNombre(carritos.producto)
  producto = producto[0]

  //////////////////// Envia EMAil ////////////////////
  const mensajeHtml = JSON.stringify(producto)
  const mensaje = 'Nuevo Pedido '+ usuarioActual + " " + JSON.stringify(producto)
  try {
      const info =  transporter.sendMail({
        from: 'Servidor Node.js',
        to: config.TEST_MAIL,
        subject: 'Nuevo Pedido ' + usuarioActual,
        html: mensajeHtml
      })
    } catch (error) {
      logger.error(error)
    }

    //////////////////// Genera Orden ////////////////////
    let fecha = moment().format("DD/MM/YYYY HH:mm:ss")    
    let Neworden = new orden()
    Neworden.producto = producto.nombre
    Neworden.descripcion = producto.descripcion
    Neworden.precio = producto.precio
    Neworden.cantidad = carritos.cantidad
    Neworden.numorden = uid()
    Neworden.fecha = fecha
    Neworden.estado = 'generada'
    Neworden.email = carritos.email  
    const guardarOrden = await ordenApi.guardar(Neworden)

    //////////////////// Elimina Carrito ////////////////////
    const carEliminado = await carritosApi.borrar(req.body.id);
    res.json(carEliminado)
})

export { carritosRouter }