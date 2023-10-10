import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import store from './pages/store';
import Counter from './pages/Counter';
import ExpenseForm from './pages/ExpenseForm'; // Import the ExpenseForm component
import Update from './pages/Update';

function AuthenticatedApp() {
  const [userName, setUserName] = useState('');

  // Retrieve the user's name from local storage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/counter" element={<Counter />} />
          <Route
            path="/expense-form"
            element={<ExpenseForm userName={userName} />} // Pass userName as a prop
          />
          <Route path="/about" element={<Update />} />
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

function App() {
  // You can implement user authentication logic here if needed

  return <AuthenticatedApp />;
}

export default App;
