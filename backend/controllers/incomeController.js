import * as incomeService from '../services/incomeService.js';

// Controller สำหรับดึงข้อมูลรายรับทั้งหมด
const getIncomes = async (req, res) => {
  try {
    const incomes = await incomeService.getAllIncomes();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching incomes' });
  }
};

// Controller สำหรับเพิ่มรายรับใหม่
const addIncome = async (req, res) => {
  const { amount, description } = req.body;
  try {
    const newIncome = await incomeService.createIncome(amount, description);
    res.json(newIncome);
  } catch (error) {
    res.status(500).json({ error: 'Error adding income' });
  }
};

const editIncome = async (req, res) => {
  const id = parseInt(req.params.id); // Parse ID to integer
  const { amount, description } = req.body;
  try {
    const updatedIncome = await incomeService.updateIncome(id, amount, description);
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: 'Error updating income' });
  }
};

const deleteIncome = async (req, res) => {
  const id = parseInt(req.params.id); // Parse ID to integer
  try {
    await incomeService.deleteIncome(id);
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting income' });
  }
};

export { getIncomes, addIncome, editIncome, deleteIncome };
