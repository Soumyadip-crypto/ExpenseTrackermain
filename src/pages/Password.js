// PasswordReset.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function PasswordReset() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email === '') {
      return toast.error('Please enter your email');
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.log(error);
      toast.error('Error sending password reset email.');
    }
  };

  return (
    <div className="password-reset-container">
      <h1>Reset Password</h1>
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
      <div className="flex justify-center mb-3">
        <button onClick={handleResetPassword} className="reset-password-button">
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default PasswordReset;
