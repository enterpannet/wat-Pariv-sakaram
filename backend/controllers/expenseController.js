import * as expenseService from '../services/expenseService.js';

// Controller สำหรับดึงข้อมูลรายจ่ายทั้งหมด
const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};

// Controller สำหรับเพิ่มรายจ่ายใหม่
const addExpense = async (req, res) => {
  const { amount, description } = req.body;
  try {
    const newExpense = await expenseService.createExpense(amount, description);
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
};

export { getExpenses, addExpense };
