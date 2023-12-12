import nodemailer from 'nodemailer'
import config from '../config/config.js';

class Mail {
    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: config.TRANSPORT_USER,
                pass: config.HOTMAIL_TRANSPORT_PASS
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            },
            port: 587
        })
    }

    send = async (mailOptions) => {
        const result = await this.transport.sendMail({
            from: config.TRANSPORT_USER,
            to: mailOptions.user,
            subject: mailOptions.subject,
            html: mailOptions.html
        })

        return result
    }
}

export const sendMail = new Mail();