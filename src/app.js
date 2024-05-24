// Imports dependencies
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
// Import utils
import config from './config/config.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import errorHandler from './middlewares/errors.middleware.js'
import { passportCall } from './utils/utils.js';
import { __dirname } from './dirname.js';
import { addLogger } from './utils/logger.js';
import imap from './imap/imapHadler.js';
import { ExpensesService } from './repository/index.js';
// Import Rutes
import expensesRouter from './routes/expenses.routes.js';
import incomesRouter from './routes/incomes.routes.js';
import usersRouter from './routes/users.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import emailRouter from './routes/imap.routes.js';


const app = express();

const PORT = config.PORT

const httpServer = app.listen(PORT, console.log(`Server running at ${PORT}...`));

app.use(cors())
app.use(addLogger)
app.use(errorHandler)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(config.COOKIE_SECRET))

// Session 
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        dbName: config.DB_NAME,
        ttl: 5 * 60 * 60,
        autoRemove: 'interval',
        autoRemoveInterval: 60,
    }),
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 60 * 24
    }
}))

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Imap
// imap.on('bankParser', async (transferencia) => {
//     // lógica para transferencias
//     console.log('Transfer detected. Sent to EXPENSES.SERVICE.CREATE()');
//     ExpensesService.create(transferencia);
// });

// imap.on('cardParser', async (creditCharge) => {
//     // lógica para débitos
//     console.log('Purchase with card detected. Sent to EXPENSES.SERVICE.CREATE()');
//     ExpensesService.create(creditCharge);
// });


// Rutes
app.get('/', (req, res) => {
    return res.status(200).send({ status: 'success', message: 'This should be the homepage' });
});

app.use('/api/expenses', passportCall('jwt'), expensesRouter);

app.use('/api/incomes', passportCall('jwt'), incomesRouter);

app.use('/api/users', passportCall('jwt'), usersRouter);

app.use('/session', passportCall('jwt'), sessionRouter);

app.use('/api/imap', passportCall('jwt'), emailRouter);