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

// Controller สำหรับแก้ไขข้อมูลรายรับ
const editIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  try {
    const updatedIncome = await incomeService.updateIncome(id, amount, description);
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: 'Error updating income' });
  }
};

// Controller สำหรับลบข้อมูลรายรับ
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await incomeService.deleteIncome(id);
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting income' });
  }
};

export { getIncomes, addIncome, editIncome, deleteIncome };
