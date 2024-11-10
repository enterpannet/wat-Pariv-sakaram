import { useState } from 'react';
import axios from 'axios';

const Expense = ({ setExpense }) => {
  const [newExpense, setNewExpense] = useState({ amount: 0, description: '' });

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const { amount, description } = newExpense;
    if (amount && description) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/expense`, { amount, description });
        setExpense((prevExpense) => [...prevExpense, response.data]);
        setNewExpense({ amount: 0, description: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleExpenseSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;
