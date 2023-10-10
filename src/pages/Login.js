import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import PasswordReset from './Password'; // Import the PasswordReset component
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false); // State to control the display of the reset password form
  const [loginError, setLoginError] = useState(null); // State for login error message

  const navigate = useNavigate();
  
  const login = async () => {
    // Check if the fields are empty
    if (email === '' || password === '') {
      return toast.error('All fields need to be filled.');
    }
  
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/expense-form');
    } catch (error) {
      console.log(error);
      // Set the error message based on the error code
      if (error.code === 'auth/wrong-password') {
        toast.error('Check your password, it is wrong.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } 
       else {
        toast.error('Check your password, it is wrong.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  

  const handleForgotPassword = () => {
    setShowResetForm(true); // Show the password reset form
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="input-field"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button onClick={login} className="login-button">
            Login
          </button>
        </div>
        <div className="flex justify-center mb-3">
          <button onClick={handleForgotPassword} className="login-button">
            Forgot Password
          </button>
        </div>
        {loginError && <div className="error-message">{loginError}</div>}
        <div>
          <h2 className="signup-link">
            Don't have an account <Link to={'/signup'}>Signup</Link>
          </h2>
        </div>
      </div>
      {showResetForm && <PasswordReset />} 
    </div>
  );
}

export default Login;