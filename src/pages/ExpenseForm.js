// ExpenseForm.js
import React, { useState,useEffect } from 'react';
import './ExpenseForm.css';
import Expensetransaction from './Expensetransaction';
import MyNavbar from './Mynavbar';

function ExpenseForm() {
  const [expenseData, setExpenseData] = useState({
    amount: '',
    description: '',
    category: 'Food',
  });

  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    expenses.push(expenseData);
    setExpenses([...expenses]);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    setExpenseData({
      amount: '',
      description: '',
      category: 'Food',
    });
  };

  // Add state to hold the user's name
  const [userName, setUserName] = useState('');

  // Extract complex expression into a variable
  const storedUserName = localStorage.getItem('userName');

  // Retrieve the user's name from local storage when the component mounts
  useEffect(() => {
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [storedUserName]); // Use the variable here

  return (
    <div style={{fontFamily: "Times New Roman" }}>
      <MyNavbar />
      <h1 className="text-center" style={{ marginTop: '81px',color:'rgb(15 219 231)', fontFamily: "Times New Roman" }}>
        {userName ? `Welcome ${userName} To Your Profile` : 'Welcome To Profile'}
      </h1>
      <div className="expense-form-container" style={{marginTop: '53px'}}>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount Spent:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
      {/* Pass expenses to ExpenseTransaction */}
      <Expensetransaction expenses={expenses} />
    </div>
  );
}

export default ExpenseForm;
