import { useState } from 'react';
import axios from 'axios';

const Income = () => {
  const [incomes, setIncomes] = useState([]); // ใช้สถานะภายในคอมโพเนนต์สำหรับจัดการรายรับ
  const [newIncome, setNewIncome] = useState({ amount: 0, description: '' });
  const [errors, setErrors] = useState({ amount: '', description: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success'); // success or error

  const validate = () => {
    let valid = true;
    const newErrors = { amount: '', description: '' };

    if (!newIncome.amount || newIncome.amount <= 0) {
      newErrors.amount = 'กรุณาใส่จำนวนเงินด้วย';
      valid = false;
    }

    if (!newIncome.description) {
      newErrors.description = 'กรุณาใส่รายละเอียดด้วย';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const { amount, description } = newIncome;
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/income`, { amount, description });
        
        setIncomes((prevIncomes) => [...prevIncomes, response.data]); // อัปเดตรายรับในสถานะภายในคอมโพเนนต์
        setNewIncome({ amount: 0, description: '' });

        setPopupMessage('บันทึกรายรับสำเร็จ!');
        setPopupType('success');
        setShowPopup(true);
      } catch (error) {
        console.error(error);

        setPopupMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        setPopupType('error');
        setShowPopup(true);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">บันทึกรายรับ</h2>

      <form onSubmit={handleIncomeSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">จำนวนเงิน</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="ใส่แค่ตัวเลข"
            value={newIncome.amount}
            onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) })}
            className={`mt-1 p-2 w-full border rounded-md ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">รายละเอียด</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="รายละเอียด"
            value={newIncome.description}
            onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
            className={`mt-1 p-2 w-full border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Add Income
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className={`p-4 rounded-md bg-${popupType === 'success' ? 'green' : 'red'}-500 text-white`}>
            <p className="text-center">{popupMessage}</p>
            <button onClick={closePopup} className="mt-4 w-full py-2 rounded-md bg-white text-black">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;
