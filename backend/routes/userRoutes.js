import express from 'express';
import { getUsers, createUser, deleteUser, updateUserActiveStatus, updateUserSetdownStatus } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id/active-status', updateUserActiveStatus); // Route for updating active status
router.patch('/:id/setdown-status', updateUserSetdownStatus); // Route for updating setdown status

export default router;
