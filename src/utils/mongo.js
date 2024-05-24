import { connect, set } from "mongoose";
import config from '../config/config.js';

export const connectMongo = async() => {
    try {
        set('strictQuery', false);
        await connect(config.MONGO_URI, { dbName: config.DB_NAME });

        console.log('Connection to MongoDB, checked.')
    } catch (error) {
        if(error) {
            console.log(`We have trubles trying to connect to MongoDB` + error.message)
            process.exit();
        }
    }
}
