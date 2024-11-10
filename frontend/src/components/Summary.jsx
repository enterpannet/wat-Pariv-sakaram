const Summary = ({ income, expense }) => {
    // คำนวณคงเหลือ
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpense;
  
    return (
      <div>
        <h2>Summary</h2>
        <div>
          <h3>Total Income: {totalIncome}</h3>
          <h3>Total Expense: {totalExpense}</h3>
          <h3>Balance: {balance}</h3>
        </div>
  
        <h3>Income List</h3>
        <ul>
          {income.map((item) => (
            <li key={item.id}>{item.amount} - {item.description} - {item.date}</li>
          ))}
        </ul>
  
        <h3>Expense List</h3>
        <ul>
          {expense.map((item) => (
            <li key={item.id}>{item.amount} - {item.description} - {item.date}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Summary;
  