import { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
  const [formData, setFormData] = useState({ donorName: '', address: '', items: '', amount: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // success or error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('====================================');
        console.log(222);
        console.log(formData);
      await axios.post(`${import.meta.env.VITE_API_URL}/donations`, formData);
      setMessage('Donation recorded successfully');
      setMessageType('success');
      setFormData({ donorName: '', address: '', items: '', amount: '' });
    } catch (error) {
      setMessage('Error recording donation');
      setMessageType('error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">บันทึกการบริจาค</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="donorName" className="block text-sm font-medium text-gray-600">ชื่อคนบริจาค</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="ชื่อคนบริจาค"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">ที่อยู่(มาจากไหนหรือชื่อหมู่บ้าน)</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="มาจากไหนหรือชื่อหมู่บ้าน"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="items" className="block text-sm font-medium text-gray-600">ของที่เอามาบริจาค</label>
          <input
            type="text"
            name="items"
            value={formData.items}
            onChange={handleChange}
            placeholder="สิ่งของ กับข้าว(ที่ไม่ใช่เงิน)"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">จำนวนเงิน</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="ใส่แค่ตัวเลข"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          บันทึก
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center p-2 rounded-md ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DonationForm;
