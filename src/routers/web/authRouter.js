import { Router } from 'express'
import config from '../../config.js'
import logger from '../../log4js/log4js-module.js'
import jwt from '../../jwt.js'
import multer from 'multer'
import usuario from '../../modelos/Usuario.js'

import {
  createHash,
  isValidPassword
} from '../../utils.js'

import { transporter } from '../../mail.js'

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
      cb(null,'./images/')
  },
  filename: (req,file,cb)=>{
      //cb(null,file.fieldname + '-' + Date.now())
      cb(null,file.originalname)
  }
})


const upload = multer({storage})

const authRouter = Router()

authRouter.get('/faillogin', (req, res) => {
    return res.render('faillogin')
  })

authRouter.get('/failregistro', (req, res) => {
    return res.render('failregistro')
})

authRouter.get('/login', (req, res) => {
  return res.render('login')
})

authRouter.post('/login', (req, res) => {
    const email = req.body.nombre
    const password = req.body.password
    //////////////////// Comprobar Usuario Existe ////////////////////
    usuario.findOne({ email : email})
    .then(user => {
      if (user){
        if (isValidPassword(user.password, password)){
        req.session.user = email
        let access_token = jwt.generateAuthToken(email)   
        res.json({ access_token })
        }else{
          res.json({ })
        }
      }
      else{
        res.json({ })
      }
    })    
  })


authRouter.get('/' ,(req, res) => {
  if (req.session.user)
     return res.render('productos')
    else
    return res.render('login')
  })

authRouter.get('/registro', (req, res) => {
  return res.render('registro')
})
 
authRouter.post('/registro',upload.single('avatar'), (req, res) => {
        const email = req.body.email
        usuario.findOne({ email : email })
        .then(user => {
          if (user) {
            //res.json({ })
            res.render('failregistro')
          }
          //////////////////// Crea Usuario ////////////////////
          let newUser = new usuario()
          newUser.password = createHash(req.body.password)
          console.log(newUser.password)
          newUser.nombre = req.body.nombre
          newUser.email = email
          newUser.direccion = req.body.direccion
          newUser.edad = req.body.edad
          newUser.telefono = req.body.telefono
          newUser.avatar = req.file.originalname
          newUser.save()
          // try {
          //   const info =  transporter.sendMail({
          //     from: 'Servidor Node.js',
          //     to: config.TEST_MAIL,
          //     subject: 'Nuevo Registro',
          //     html: JSON.stringify(newUser)
          //   })
          // } catch (error) {
          //   logger.error(error)
          // }
          // req.session.user = email
          // let access_token = jwt.generateAuthToken(email)           
          // res.json({ access_token })
          res.render('login')
        })
  })

authRouter.get('/info', (req, res) => {
  return res.render('info')
})

authRouter.post('/info',jwt.auth, (req, res) => {
  console.log(req.session.user)
  if (req.session.user){
    let email = req.session.user
      usuario.findOne({ email : email })
      .then(user => {
        res.json(user)
        })    
      }else{
        res.render("error")
      }
  })

authRouter.get('/logout', (req, res) => {  
  return res.render('logout')
})

authRouter.post('/logout', jwt.auth, (req, res) => {
    let usuarioActual = req.user.usuario
    req.session.destroy(err => {
        if (!err) 
        res.json({usuarioActual})
        else res.send({ status: 'Logout ERROR', body: err })
    })      
})

authRouter.get('/carrito', (req, res) => {  
  return res.render('carritos')
})

authRouter.get('/productos', (req, res) => {  
  return res.render('productos')
})

export {authRouter}