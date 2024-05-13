import { Router } from 'express';
import { create, deleteIncome, get, getByCategory } from '../controllers/income.controller.js';

const router = Router();

router.get('/', get);

router.get('/category/:category', getByCategory);

router.post('/add', create);

router.delete('/delete/:id', deleteIncome)


export default router