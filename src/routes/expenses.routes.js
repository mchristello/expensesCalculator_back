import { Router } from 'express';
import { get, create, getByCategory, deleteExpense } from '../controllers/expenses.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { authToken } from '../utils/utils.js';

const router = Router();

router.get('/', authToken, AuthMiddleware.currentUser, get)

router.get('/category/:category', getByCategory);

router.post('/add', authToken, AuthMiddleware.currentUser, create);

router.delete('/delete/:id', deleteExpense)

export default router