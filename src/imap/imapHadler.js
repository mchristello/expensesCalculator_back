import imap from "./imapClient.js";
import { parserCardMovement } from "./parsers/cardParser.js";
import { parserBankMovement } from "./parsers/bankParser.js";

imap.once('ready', () => {
    console.log(`Established connection witn IMAP...`);
    imap.openBox('INBOX', true, (err, box) => {
        if (err) {
            console.error(err);
            return false;
        }
        
        // Buscar correos electrónicos no leídos de los remitentes especificados
        const remitentes = ['avisos@bbva.com.ar', 'prismahome@prismasystems.com.ar'];
        const searchCriteria1 = ['UNSEEN', ['FROM', remitentes[0]]];
        const searchCriteria2 = ['UNSEEN', ['FROM', remitentes[1]]];

        // SEARCH FOR FIRST REMITENT 
        imap.search(searchCriteria1, (err, searchResults) => {
            if (err) {
                console.error('Error al buscar correos electrónicos:', err)
                return false;
            };

            searchResults.forEach((emailIndex) => {
                const fetchOptions = { bodies: '', struct: true, markseen: true };
                const fetch = imap.fetch(emailIndex, fetchOptions);

                fetch.on('message', (msg) => {
                    msg.on('body', (stream, info) => {
                        parserBankMovement(stream, (err, movimiento) => {
                            if (err) {
                                console.error('Error al analizar correo de transferencia:', err);
                                return;
                            }
                            // Emitir evento 'transferParsed' con los datos analizados
                            imap.emit('bankParser', movimiento);

                            // Move email to BANCO folder
                            imap.move(emailIndex, 'BANCO', (err) => {
                                if (err) {
                                    console.log(`Error al mover el mail a BANCO: ${err.message}`);
                                    return false;
                                }
                            })
                        });
                    })
                })
            })
        });

        // SEARCH FOR SECOND REMITENT
        imap.search(searchCriteria2, (err, searchResults) => {
            if (err) {
                console.error('Error al buscar correos electrónicos:', err.message)
                return false;
            };

            searchResults.forEach((emailIndex, index) => {
                const fetchOptions = { bodies: '', struct: true, markseen: true };
                const fetch = imap.fetch(emailIndex, fetchOptions);
                
                fetch.on('message', (msg) => {
                    msg.on('body', (stream, info) => {
                        parserCardMovement(stream, (err, movimiento) => {
                            if (err) {
                                console.error('Error al analizar correo de transferencia:', err.message);
                                return;
                            }
                            imap.emit('cardParser', movimiento);
                            // Move email to BANCO folder
                            imap.move(emailIndex, 'BANCO', (err) => {
                                if (err) {
                                    console.log(`Error al mover el mail a BANCO: ${err.message}`);
                                    return false;
                                }
                            })
                        });
                    })
                });
            })
        })
    });
});

export default imap;