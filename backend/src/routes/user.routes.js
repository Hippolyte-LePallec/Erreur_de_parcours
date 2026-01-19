// src/routes/user.routes.js
import { Router } from 'express';
import { registerUser, loginUser, getUsers, getUserById, resetPassword } from '../controllers/user.controller.js';

const router = Router();

// Routes d'authentification
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

// Routes utilisateur
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
