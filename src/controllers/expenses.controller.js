import { ExpensesService } from "../repository/index.js";


export const get = async (req, res) => {
    try {
        const expenses = await ExpensesService.get();

        const result = expenses.length > 0 ? expenses : 'There are no expenses to show.'

        return res.status(200).send({ status: 'success', message: 'Here you can see all the expenses of the DB', payload: result })
    } catch (error) {
        console.log(`Error in expenses.controller: ${error.message}`);
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
    
        const user = await ExpensesService.create(data)
    
        return res.status(200).send({ status: 'success', message: 'New expense created successfully', payload: user })
    } catch (error) {
        console.log(`Error in expenses.controller: ${error.message}`);
    }
};