import { simpleParser } from "mailparser";
import { creditHandler } from "../movementsHandlers/movementHandler.js";


export const parserCardMovement = (stream, callback) => {
    simpleParser(stream, (err, mail) => {
        if (err) {
            console.error(err);
            return false;
        }
        const html = mail.html;
        
        const movement = creditHandler(html);

        return callback(null, movement);
    })
}