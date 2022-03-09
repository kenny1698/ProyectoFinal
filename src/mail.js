import { createTransport } from 'nodemailer'
import config from './config.js'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.TEST_MAIL,
        pass: config.PASS_MAIL
    }
  })

  export { transporter }