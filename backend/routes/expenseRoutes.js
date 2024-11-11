// routes/expenseRoutes.js
import express from 'express';
import { getExpenses, addExpense, updateExpense, removeExpense } from '../controllers/expenseController.js';

const router = express.Router();

// Route to get all expenses
router.get('/expenses', getExpenses);

// Route to add a new expense
router.post('/expenses', addExpense);

// Route to update an existing expense
router.put('/expenses/:id', updateExpense);

// Route to delete an expense
router.delete('/expenses/:id', removeExpense);

export default router;
