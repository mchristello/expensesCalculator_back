import config from "../config/config.js";
import { connectMongo } from "../utils/mongo.js";

export let Expense 
export let Income 
export let User

switch(config.PERSISTENCE) {
    case 'FILE':
        console.log(`Establishing connection with FileSystem...`);

        const { default: Expensefile } = await import('./file/expenses.file.js')
        const { default: Incomefile } = await import('./file/incomes.file.js')
        const { default: Userfile } = await import('./file/users.file.js')

        Expense = Expensefile
        Income = Incomefile
        User = Userfile

        console.log(`Connected to local FileSystem....`);

        break;

    default: // default: 'MONGO'
        console.log(`Establishing connection to MongoDB...`);
        
        connectMongo()

        console.log(`Connection to DB approved from Factory!`);

        const { default: ExpenseMongo } = await import('./mongo/expenses.mongo.js')
        const { default: IncomeMongo } = await import('./mongo/incomes.mongo.js')
        const { default: UserMongo } = await import('./mongo/users.mongo.js')

        Expense = ExpenseMongo
        Income = IncomeMongo
        User = UserMongo

        break;
}