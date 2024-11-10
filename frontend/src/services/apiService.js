import axios from 'axios';

// ดึงข้อมูลรายรับจาก API
export const getIncomes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/income`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incomes:', error);
  }
};

// ดึงข้อมูลรายจ่ายจาก API
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/expense`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};
