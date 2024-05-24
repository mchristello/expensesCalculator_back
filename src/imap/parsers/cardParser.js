import { simpleParser } from "mailparser";
import { creditHandler, debitCardHandler } from "../movementsHandlers/movementHandler.js";


export const parserCardMovement = (stream, callback) => {
    simpleParser(stream, (err, mail) => {
        if (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
        const html = mail.html;

        if (mail.subject.includes('tarjeta de débito')) {
            const movement = debitCardHandler(html)
            
            return callback(null, movement);
        } else if (mail.subject.includes('consumos de sus tarjetas')){
            const movement = creditHandler(html);
    
            return callback(null, movement);
        }
        
    })
}