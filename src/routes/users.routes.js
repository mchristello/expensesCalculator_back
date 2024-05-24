import { Router } from 'express';
import { get, create, deleteUser, currentUser, findByEmail } from '../controllers/users.controller.js';
import { authToken } from '../utils/utils.js';

const router = Router();

router.get('/', get);

router.get('/search', findByEmail)

router.get('/current', authToken, currentUser)

router.post('/add', create);

router.delete('/delete/:id', deleteUser)


export default router;