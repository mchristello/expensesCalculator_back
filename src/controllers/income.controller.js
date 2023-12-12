import { IncomesSerivce } from "../repository/index.js";


export const get = async (req, res) => {
    try {
        const incomes = await IncomesSerivce.get();

        const result = incomes.length > 0 ? incomes : 'There are no incomes yet.'

        return res.status(200).send({ status: 'success', message: 'Here you can see all the incomes of the DB', payload: result })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`);
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
    
        const user = await IncomesSerivce.create(data)
    
        return res.status(200).send({ status: 'success', message: 'New user created successfully', payload: user })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`);
    }
};