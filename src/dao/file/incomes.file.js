import fs from 'fs';
import { __dirname } from '../../dirname.js';

export default class Income {
    constructor() {
        this.path = `${__dirname}/json/incomes.json`;
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

    create = async (movement) => {
        const data = this.get();
        const id = this.#getNextID(data)

        const newMovement = {
            id: id,
            category: movement.category,
            amount: movement.amount,
            date: movement.date,
            dastinedTo: movement.dastinedTo,
        };

        data.push(newMovement);

        await this.#write(data);
        return newMovement;
    }

    getByCategory = async(category) => {
        const data = this.get();
        const filteredData = data.filter(inc => inc.category === category);

        return filteredData;
    }

    delete = async(iid) => {
        const data = this.get();
        const filteredData = data.filter(inc => inc.id !== iid);

        await this.#write(data);
        return true;
    }
}
