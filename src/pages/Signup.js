import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    if (name === '' || email === '' || password === '') {
      return toast.error('All fields are required');
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format. Please use the format: j@gmail.com');
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error('Password must be at least 6 characters long and contain at least one special character.');
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(users.user);
      console.log(name);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      // Store the user's name in local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userName', name);

      const userRef = collection(fireDB, 'users');
      await addDoc(userRef, user);
      toast.success('Signup successful. Please check your email for a verification link.');

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Please try logging in.');
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <div className='joy'>
          <h1>Signup</h1>
        </div>
        <div>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input-field'
            placeholder='Name'
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input-field'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-field'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button onClick={signup} className='signup-button'>
            Signup
          </button>
        </div>
        <div>
          <h2 className='login-link'>
            Have an account <Link to={'/'}>Login</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
