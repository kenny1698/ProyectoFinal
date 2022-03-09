import fs from 'fs'

import dotenv from 'dotenv'
import parseArgs from 'minimist'

dotenv.config()

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    p: 'port',
    m: 'mode',
    a: 'auth',
  },
  default: {
    port: 8080,
    mode: 'FORK',
    auth: 'NO_AUTH',
    NODE_ENV: 'DEV',
  },
})

function getSpecs() {
    return {
      env: { description: 'entorno de ejecucion', value: argv.NODE_ENV },
      puerto: { description: 'puerto', value: argv.port },
      modo: { description: 'modo', value: argv.mode },
      argumentos: {
        description: 'argumentos de entrada',
        value: process.argv.slice(2).join(', '),
      },
      plataforma: { description: 'plataforma', value: process.platform },
      versionNode: { description: 'version de node', value: process.version },
      memoriaReservada: {
        description: 'memoria total reservada (MB)',
        value: parseInt(process.memoryUsage().rss / 1024 / 1024),
      },
      rutaEjecucion: {
        description: 'path de ejecucion del entorno',
        value: process.execPath,
      },
      idProceso: { description: 'id de proceso', value: process.pid },
      directorioProyecto: {
        description: 'path del proyecto',
        value: process.cwd(),
      },
    }
  }

export default {
    getSpecs,
    NODE_ENV: argv.NODE_ENV,
    PORT: argv.port,
    mode: argv.mode,
    auth: argv.auth,
    fileSystem: {
        path: './DB'
    },
    env:{
        // method:'json'
         method: 'mongodb'
        //method: 'firebase'
    },
    mongodb: {
        cnxStr: process.env.MONGODB_REMOTO,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: JSON.parse(fs.readFileSync('./DB/firestore/proyectofinal2-1ec6f-firebase-adminsdk-4gw27-a6901626e6.json')),
    TEST_MAIL: 'nova.rath6@ethereal.email',
    PASS_MAIL:'jVcN73tfuGBJ6RGkdf',
    accountSid: 'AC63708a239cf7757e4fed929f482fe0d7',
    authToken: 'c94e671ee75475dbd589009b2cde919b',

    usuarioAdmin:'admin',
    passAdmin:'admin'

    //modo: 'FORK'
   
}
