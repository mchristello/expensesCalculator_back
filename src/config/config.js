import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    ENTORNO: process.env.ENT,
    PERSISTENCE: process.env.PERSISTENCE,
    // Mongo
    MONGO_URI: process.env.MONGO_URI,
    DB_NAME: process.env.DB_NAME,
    // JWT
    JWT_PASS: process.env.JWT_PASS,
    // GitHub 
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GITHUB_CALLBACK_URL_PRODUCTION: process.env.GITHUB_CALLBACK_URL_PRODUCTION,
    // Cookies
    COOKIE_NAME: process.env.COOKIE_NAME,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    // Nodemailer
    TRANSPORT_USER: process.env.TRANSPORT_USER,
    HOTMAIL_TRANSPORT_PASS: process.env.HOTMAIL_TRANSPORT_PASS,
    // IMAP
    IMAP_HOST: process.env.IMAP_HOST,
    IMAP_USER: process.env.IMAP_USER,
    IMAP_PASSWORD: process.env.IMAP_PASSWORD
}