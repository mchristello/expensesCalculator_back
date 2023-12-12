import { Router } from 'express';
import ExpensesModel from '../dao/mongo/models/expenses.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const expenses = await ExpensesModel.find()

    const result = expenses.length > 0 ? expenses : `There's nothing to show yet`

    return res.status(200).send({ status: 'success', message: 'This will show all the expenses', payload: result })
});

router.post('/add', async (req, res) => {
    const newExpense = req.body

    const addExpense = await ExpensesModel.create(newExpense)

    return res.status(200).send({ status: 'success', message: 'New Expense Added', payload: addExpense });
});

export default router