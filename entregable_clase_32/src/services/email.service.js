import { createTransport } from "nodemailer";
import config from "../config/config.js";


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
            console.log(info);
        } catch (error) {
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