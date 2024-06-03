import { ExpensesService } from "../repository/index.js";


export const get = async (req, res) => {
    try {
        const user = req.user
        const expenses = await ExpensesService.get(user);

        const result = expenses.length > 0 ? expenses : 'There are no expenses to show.'

        return res.status(200).send({ status: 'success', message: 'Here you can see all the expenses of the DB', payload: expenses })
    } catch (error) {
        console.log(`Error in expenses.controller: ${error.message}`);
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user
        
        data.user = user._id;
        
        const expense = await ExpensesService.create(data)
    
        return res.status(200).send({ status: 'success', message: 'New expense created successfully', payload: expense })
    } catch (error) {
        console.log(`Error in expenses.controller - create: ${error.message}`);
    }
};

export const getByCategory = async (req, res) => {
    try {
        const category = req.params.category

        const searchExpenses = await ExpensesService.getByCategory(category.toLowerCase())

        const result = searchExpenses.length !== 0 ? searchExpenses : `Your serch didn't bring any result.`

        return res.status(200).send({ status: 'success', message: `Data from ${category} category`, payload: result })
    } catch (error) {
        console.log(`Error in expenses.controller: ${error.message}`);
    }
}

export const update = async (req, res) => {
    try {
        const changes = req.body;
        const eid = req.params.id

        const updateExpense = await ExpensesService.update(eid, changes)

        return res.status(200).send({ status: 'success', message: `Updated...`, payload: updateExpense });

    } catch (error) {
        console.log(`Error in expenses.controller: ${error.message}`);
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const eid = req.params.id
        const expenseToDelete = await ExpensesService.delete(eid)

        return res.status(200).send({ status: 'success', message: 'Expense deleted successfully', payload: expenseToDelete })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}