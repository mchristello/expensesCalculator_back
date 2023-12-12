import { Router } from 'express';
import passport from 'passport';
import { registerPost } from '../controllers/session.controller.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/users' }), registerPost)

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/users' }))


export default router;