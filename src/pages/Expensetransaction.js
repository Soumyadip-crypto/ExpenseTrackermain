// ExpenseTransaction.js


import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './Expensetransaction.css';

const Expensetransaction = ({ expenses }) => {
  
  const [totalAmount, setTotalAmount] = useState(0);

  
  useEffect(() => {
    let total = 0;
    for (let expense of expenses) {
      total += Number(expense.amount); 
    }
    setTotalAmount(total);
  }, [expenses]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Set to 4 items per page

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({});

  // Calculate total pages
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  // Get current expenses
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Delete expense
  const deleteExpense = index => {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    window.location.reload(); // Refresh the page to update the table
  };

  // Edit expense
  const editExpense = index => {
    setIsEditing(true);
    setCurrentExpense({ index, ...expenses[index] });
  };

  // Handle update
  const handleUpdate = event => {
    event.preventDefault();
    expenses[currentExpense.index] = currentExpense;
    localStorage.setItem('expenses', JSON.stringify(expenses));
    setIsEditing(false);
    window.location.reload(); // Refresh the page to update the table
  };

  return (
    <div style={{fontFamily: "Times New Roman" }}>
      <h2>List Of expense</h2>
      <h3>Total: {totalAmount}</h3> {/* Display the total amount here */}
      {isEditing ? (
        <form onSubmit={handleUpdate} style={{}}>
          <input type="number" name="amount" value={currentExpense.amount} onChange={e => setCurrentExpense({ ...currentExpense, amount: e.target.value })} required />
          <input type="text" name="description" value={currentExpense.description} onChange={e => setCurrentExpense({ ...currentExpense, description: e.target.value })} required />
          <select name="category" value={currentExpense.category} onChange={e => setCurrentExpense({ ...currentExpense, category: e.target.value })} required>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
          <button type="submit">Update Expense</button>
        </form>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td><button onClick={() => editExpense(index)}>Edit</button></td>
                <td><button onClick={() => deleteExpense(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="pagination">
        <button onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}>Previous</button>
        {[...Array(totalPages)].map((e, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}>Next</button>
      </div>
    </div>
  )
}

export default Expensetransaction;
