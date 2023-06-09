import { createTransport } from "nodemailer";
import config from "../config/config.js";
import { winstonLogger } from "../middlewares/winstonLogger.js";


// const receiver = "buddy.dickens@ethereal.email"
// const message = "Le pongo mensaje por paramatro!!"

class EmailService {
    nodemailerClient

    constructor(nodemailerCredentials) {
        this.nodemailerClient = createTransport({
            service: 'gmail',
            port: 587,
            auth: nodemailerCredentials
        })
    }


    async send({receiver, message}) {
        const mailOptions = {
            from: 'Servidor Express Federico Blanco',
            to: receiver,
            subject: 'Email de prueba 2',
            text: message
        }

        try {
            const info = await this.nodemailerClient.sendMail(mailOptions)
            // console.log("****** linea 31 email.service *****");
            // console.log(info);
            // console.log("****** linea 33 email.service *****");
            winstonLogger.info(`Email de ${mailOptions.from} para ${mailOptions.to} enviado exitosamente  - ${new Date().toLocaleTimeString()}`)
        } catch (error) {
            winstonLogger.error(`Error en "send" de nodemailer -- email.service.js - ${new Date().toLocaleTimeString()} -- ${error}` )
            throw new Error(`Error en "send" de nodemailer -- email.service.js -- ${error}` )
        }
    }

    async sendPasswordReset(receiver, message, resetPasswordUrl) {

        // console.log("******  Linea 43 email.service.js  ---  sendPasswordReset ******");
        // console.log("receiver --> ", receiver);
        // console.log("******  Linea 45 email.service.js  ---  sendPasswordReset ******");
        // console.log("message --> ", message);
        // console.log("******  Linea 47 email.service.js  ---  sendPasswordReset ******");
        // console.log("resetPasswordUrl --> ", resetPasswordUrl);


        const mailOptions = {
            from: 'Servidor Express Federico Blanco',
            to: receiver,
            subject: 'Email de reestablecimiento de contraseña',
            text: `${message}: para reestablecer presione el link\n${resetPasswordUrl}`,
            html:`<p>${message}</p>
            <a href=${resetPasswordUrl} target="_blank" rel="noreferrer" >Reestablecer contraseña</a>`
        }

        try {
            const info = await this.nodemailerClient.sendMail(mailOptions)
            // console.log("****** linea 62 email.service *****");
            // console.log(info);
            // console.log("****** linea 64 email.service *****");
            winstonLogger.info(`Email de ${mailOptions.from} para ${mailOptions.to} enviado exitosamente  - ${new Date().toLocaleTimeString()}`)
            return info;
        } catch (error) {
            winstonLogger.error(`Error en "send" de nodemailer -- email.service.js - ${new Date().toLocaleTimeString()} -- ${error}` )
            throw new Error(`Error en "send" de nodemailer -- email.service.js -- ${error}` )
        }
    }
}

export const emailService = new EmailService({user: config.EMAIL_USER, pass: config.EMAIL_PASS})

// console.log(config.EMAIL_USER);
// console.log(config.EMAIL_PASS);
// console.log(receiver);
// console.log(message);

// emailService.send(receiver, message)