import Imap from 'imap';
import config from '../config/config.js';



const imapConfig = {
    host: config.IMAP_HOST,
    user: config.IMAP_USER,
    password: config.IMAP_PASSWORD,
    port: 993, 
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false,
    }
};

const imap = new Imap(imapConfig);

export default imap;