// controllers/expenseController.js
import { editExpense, deleteExpense, getAllExpenses, createExpense } from '../services/expenseService.js';

// ฟังก์ชันเพื่อดึงข้อมูลรายจ่ายทั้งหมด
const getExpenses = async (req, res) => {
    try {
        const expenses = await getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลรายจ่ายได้' });
    }
};

// ฟังก์ชันเพื่อเพิ่มข้อมูลรายจ่ายใหม่
const addExpense = async (req, res) => {
    const { amount, description } = req.body;
    try {
        const newExpense = await createExpense(amount, description);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'ไม่สามารถเพิ่มข้อมูลรายจ่ายได้' });
    }
};

// ฟังก์ชันเพื่อแก้ไขข้อมูลรายจ่าย
const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description } = req.body;
    try {
        const updatedExpense = await editExpense(parseInt(id), amount, description);
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'ไม่สามารถแก้ไขข้อมูลรายจ่ายได้' });
    }
};

// ฟังก์ชันเพื่อลบข้อมูลรายจ่าย
const removeExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await deleteExpense(parseInt(id));
        res.status(200).json(deletedExpense);
    } catch (error) {
        res.status(500).json({ error: 'ไม่สามารถลบข้อมูลรายจ่ายได้' });
    }
};

export { getExpenses, addExpense, updateExpense, removeExpense };
