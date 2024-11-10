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

export { getIncomes, addIncome };
