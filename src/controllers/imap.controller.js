import imap from "../imap/imapClient.js";
import { ExpensesService } from "../repository/index.js";

export const get = async(req, res) => {
    try {
        const fetchEmails = imap.connect();

        const user = req.session.user;

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
