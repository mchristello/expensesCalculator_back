import imap from "../imap/imapClient.js";
import { ExpensesService } from "../repository/index.js";
// import { bankProccessHandler } from '../dao/file/bankProcessHandler.js';

export const get = async(req, res) => {
    try {
        const fetchEmails = imap.connect();

        const user = req.user;

        imap.on('bankParser', async (transferencia) => {
            transferencia.user = user;
            // lógica para transferencias
            console.log('Transfer detected. Sent to EXPENSES.SERVICE.CREATE()');
            ExpensesService.create(transferencia);
        });
        
        imap.on('cardParser', async (creditCharge) => {
            creditCharge.user = user;
            // lógica para débitos
            console.log('Purchase with card detected. Sent to EXPENSES.SERVICE.CREATE()');
            ExpensesService.create(creditCharge);
        });

        return res.status(200).send({ status: 'success', message: 'Connecting with email account...' });
    } catch (error) {
        console.log(`Error in imap.controller - get: ${error.message}`);
        return res.status(500).send({ status: 'error', message: 'Couldn\'t connect to email account', payload: error.message });
    }
}

// export const getInfo = async(req, res) => {
//     try {
//         const response = await bankProccessHandler.getInfo();

//         return res.status(200).send({ status: 'success', message: 'Retriving movements info...', payload: response });
//     } catch (error) {
//         console.log(`Error in imap.controller - getInfo: ${error.message}`);
//         return res.status(500).send({ status: 'error', message: 'Couldn\'t connect to email account', payload: error.message });
//     }
// }