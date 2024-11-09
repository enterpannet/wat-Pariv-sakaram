import express from 'express';
import { getUsers, createUser, deleteUser, updateUserStatus } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUserStatus); // New route for updating user status

export default router;
