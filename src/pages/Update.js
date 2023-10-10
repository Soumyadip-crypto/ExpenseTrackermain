
import React, { useState, useEffect } from 'react';
import MyNavbar from './Mynavbar';

function Update() {
  
  const [userName, setUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');

  
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  
  const handleNewUsernameChange = (e) => {
    setNewUserName(e.target.value);
  };

  // Function to handle username update
  const handleUsernameUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', newUserName);
    setUserName(newUserName);
    setNewUserName('');
  };

  return (
    <div style={{fontFamily: "Times New Roman" }}>
      <MyNavbar />
      <h1 className="text-center" style={{ marginTop: '81px',color:'rgb(15 219 231)', fontFamily: "Times New Roman" }}>
        {userName ? `Welcome ${userName} To Your Profile` : 'Welcome To Profile'}
      </h1>
      <div className="expense-form-container" style={{marginTop: '53px'}}>
        <h2>Update profile </h2>
        <form onSubmit={handleUsernameUpdate}>
          <div className="form-group">
            <label htmlFor="description">User Name</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newUserName}
              onChange={handleNewUsernameChange}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
