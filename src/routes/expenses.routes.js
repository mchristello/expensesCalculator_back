import { Router } from 'express';
import { get, create, getByCategory, deleteExpense } from '../controllers/expenses.controller.js';

const router = Router();

router.get('/', get)

router.get('/category/:category', getByCategory);

router.post('/add', create);

router.delete('/delete/:id', deleteExpense)

export default router