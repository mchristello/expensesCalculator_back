import { Router } from 'express';
import { create, deleteIncome, get, getByCategory, update } from '../controllers/income.controller.js';
import { authToken } from '../utils/utils.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authToken, AuthMiddleware.currentUser, get);

router.get('/category/:category', authToken, getByCategory);

router.post('/add', authToken, create);

router.put('/update/:id', authToken, update)

router.delete('/delete/:id', authToken, deleteIncome)


export default router