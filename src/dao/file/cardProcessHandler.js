import fs from "fs";
import { __dirname } from "../../dirname.js";

class CardProcessHandler {
    constructor () {
        this.path = `${__dirname}/json/movements_BBVA.json`;
    }
    
    #getNextID = (data) => {
        const count = data.length 
        const nextID = (count > 0) ? data[count-1].id + 1 : 1

        return nextID
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }
        return [];
    }

    get = async() => {
        const data = await this.read();
        return data;
    }

    write = async(array) => {
        return fs.promises.writeFile(this.path, JSON.stringify(array, null, 4), 'utf-8');
    }

    add = async (movement) => {
        const data = await this.get();
        const id = this.#getNextID(data);

        const newMovement = {
            id: id,
            categoria: movement.categoria,
            importe: movement.importe,
            fecha: movement.fecha,
            destino: movement.destino,
        };

        data.push(newMovement);

        await this.write(data);
        return newMovement;
    }
}


export const cardProcessHandler = new CardProcessHandler();