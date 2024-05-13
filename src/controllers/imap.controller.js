import imap from "../imap/imapClient.js";
import { bankProcessHandler } from "../imap/processHandler/bankProcessHandler.js";


export const get = async(req, res) => {
    try {
        const fetchEmails = imap.connect();

        return res.status(200).send({ status: 'success', message: 'Connecting with email account...' });
    } catch (error) {
        console.log(`Error in imap.controller - get: ${error.message}`);
        return res.status(500).send({ status: 'error', message: 'Couldn\'t connect to email account', payload: error.message });
    }
}

export const getInfo = async(req, res) => {
    try {
        const response = await bankProcessHandler.get();

        // console.log({response});

        return res.status(200).send({ status: 'success', message: 'Retriving movements info...', payload: response });
    } catch (error) {
        console.log(`Error in imap.controller - getInfo: ${error.message}`);
        return res.status(500).send({ status: 'error', message: 'Couldn\'t connect to email account', payload: error.message });
    }
}