import express from 'express';
import { getUsers, createUser, deleteUser, updateUserActiveStatus, updateUserSetdownStatus } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/active-status', updateUserActiveStatus); // Route for updating active status
router.patch('/users/:id/setdown-status', updateUserSetdownStatus); // Route for updating setdown status

export default router;
