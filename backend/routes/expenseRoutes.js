// routes/expenseRoutes.js
import express from 'express';
import { getExpenses, addExpense, updateExpense, removeExpense } from '../controllers/expenseController.js';

const router = express.Router();

// Route to get all expenses
router.get('/', getExpenses);

// Route to add a new expense
router.post('/', addExpense);

// Route to update an existing expense
router.put('/:id', updateExpense);

// Route to delete an expense
router.delete('/:id', removeExpense);

export default router;
