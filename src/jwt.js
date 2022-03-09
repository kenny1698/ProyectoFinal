import jwt from "jsonwebtoken"
//import {access_token} from './routers/authRouter.js'

const PRIVATE_KEY = "myprivatekey";

function generateAuthToken(usuario) {
  const token = jwt.sign({ usuario: usuario }, PRIVATE_KEY, { expiresIn: '60m' });
  return token;
}

function auth(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

  if (!authHeader) {
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'no se encontró token de autenticación'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    console.log("ENTRO TOKEN")
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'formato de token invalido!'
    })
  }

  try {
    req.user = jwt.verify(token, PRIVATE_KEY);
  } catch (ex) {
    return res.status(403).json({
      error: 'token invalido',
      detalle: 'nivel de acceso insuficiente para el recurso solicitado'
    })
  }

  next();
}

export default {
  generateAuthToken,
  auth
}