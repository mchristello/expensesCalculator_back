import { Router } from 'express';
import { get, create, getByCategory, deleteExpense, update } from '../controllers/expenses.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { authToken } from '../utils/utils.js';

const router = Router();

router.get('/', authToken, AuthMiddleware.currentUser, get)

router.get('/category/:category', getByCategory);

router.post('/add', authToken, AuthMiddleware.currentUser, create);

router.put('/update/:id', authToken, update);

router.delete('/delete/:id', authToken, deleteExpense)

export default router