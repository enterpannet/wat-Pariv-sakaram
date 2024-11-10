import { useState } from 'react';
import axios from 'axios';

const Income = ({ setIncome }) => {
  const [newIncome, setNewIncome] = useState({ amount: 0, description: '' });

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const { amount, description } = newIncome;
    if (amount && description) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/income`, { amount, description });
        setIncome((prevIncome) => [...prevIncome, response.data]);
        setNewIncome({ amount: 0, description: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add Income</h2>
      <form onSubmit={handleIncomeSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newIncome.description}
          onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
        />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default Income;
