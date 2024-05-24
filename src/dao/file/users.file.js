import fs from 'fs';
import { __dirname } from '../../dirname.js';

export default class Expense {
    constructor() {
        this.path = `${__dirname}/json/users.json`;
    }

    #getNextID = (data) => {
        const count = data.length;
        const nextID = (count > 0) ? data[count - 1] + 1 : 1;

        return nextID;
    }

    #write = async (list) => {
        return fs.promises.writeFile(this.path, JSON.stringify(list, null, 4), 'utf-8');
    }

    #read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8').then((r) => JSON.parse(r));
        }
        return [];
    }



    get = async () => {
        const data = await this.#read();
        return data;
    }

    create = async (user) => {
        const data = this.get();
        const id = this.#getNextID(data)

        const newUser = {
            id: id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            age: user.age,
            social: user.social || 'local',
            role: user.role || 'user',
            financialInfo: user.financialInfo || [],
        };

        data.push(newUser);

        await this.#write(data);
        return {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            age: newUser.age,
            social: newUser.social,
            role: newUser.role,
            financialInfo: newUser.financialInfo
        };
    }

    getByEmail = async(email) => {
        const data = this.get();
        const filteredData = data.filter(user => user.email === email);

        return filteredData;
    }

    delete = async(uid) => {
        const data = this.get();
        const filteredData = data.filter(user => user.id !== uid);

        await this.#write(data);
        return true;
    }
}
