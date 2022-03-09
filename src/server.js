import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import { productosRouter } from './routers/api/productosRouter.js'
import { carritosRouter } from './routers/api/carritosRouter.js'
import { chatRouter } from './routers/api/chatRouter.js'
import { infoRouter } from './routers/web/infoRouter.js'
import { authRouter } from './routers/web/authRouter.js'
import addMensajesHandlers from './routers/ws/mensajes.js'

import { engine  } from 'express-handlebars'
import Handlebars from 'handlebars'

import jwt from './jwt.js'
import logger from './log4js/log4js-module.js'
import flash from 'connect-flash'

import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'

import path from 'path';
import {fileURLToPath} from 'url';

import session from 'express-session'

import config from './config.js'

function createServer() {

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const secretmongo = 'shhhhhhhhhhhhhhhhhhhhh'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
     console.log('Nuevo cliente conectado!')
     addMensajesHandlers(socket, io.sockets)
})

app.use(session({ secret: secretmongo , 
    resave: false, 
    saveUninitialized:false, 
    cookie: { maxAge: 600000 }}))

app.use(flash())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(process.cwd(), './public')))

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir:  "./public/views/layouts",
        partialsDir:  "./public/views/partials",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        helpers: {
          toJSON : function(object) {
            return JSON.stringify(object)
          }
        }
    })
)

app.set('view engine', 'hbs')
app.set('views', './public/views')

app.use(express.static('images'));

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use(authRouter)
app.use(infoRouter)
app.use('/api/mensajes', chatRouter)

app.use('*', (req, res) => {
  res.render('error',{
    error: `${req.method} ${req.originalUrl}`,
    detalle: `ruta inexistente!`
  })
})

return {
  listen: port => new Promise((resolve, reject) => {
      const connectedServer = httpServer.listen(port, () => {
          resolve(connectedServer)
      })
      connectedServer.on('error', error => {
          reject(error)
      })
  })
}

}

export { createServer }




