import { simpleParser } from "mailparser";
import { bankTransferHandler, cardResumeHandler, debitHandler, transferHandler } from "../movementsHandlers/movementHandler.js";


export const parserBankMovement = (stream, callback) => {
    simpleParser(stream, (err, mail) => {
        if (err) {
            console.error(err.message);
            throw new Error(err.message);
        }

        const html = mail.html;
        
        if(mail.subject.includes('Realizaste una transferencia')) {

            const movement = bankTransferHandler(html);

            return callback(null, movement);

        } else if (mail.subject.includes('AVISO DEBIN DEBITADO')) {
            
            const movement = debitHandler(html)

            return callback(null, movement);

        } else if (mail.subject.includes('resumen')) {
            
            const movement = cardResumeHandler(html);

            return callback(null, movement);
        } else if(mail.subject.includes('TRANSFERENCIA INMEDIATA DEBITADA')) {
            const movement = transferHandler(html);

            return callback(null, movement);
        }

        
    })
}
