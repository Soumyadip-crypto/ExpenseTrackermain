import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementByTen, incrementByOne, decrement, deleteValue } from './counterSlice';
import MyNavbar from './Mynavbar';

function Counter() {
  const dispatch = useDispatch();
  const counterValue = useSelector((state) => state.counter.value);

  // Add state to hold the user's name
  const [userName, setUserName] = useState('');

  // Retrieve the user's name from local storage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div style={{ paddingTop: '20px',fontFamily: "Times New Roman"  }}>
      <MyNavbar />
      <h1 className="text-center" style={{ marginTop: '81px',color:'rgb(15 219 231)',    fontFamily: "Times New Roman" }}>
        {userName ? `Welcome ${userName} To Your Profile` : 'Welcome To Profile'}
      </h1>
      <div className="card text-center mb-3" style={{ maxWidth: '779px', margin: 'auto' }}>
        <div className="card-body">
          <h1 className="card-title">Counter: {counterValue}</h1>
        </div>
      </div>
      <div className="d-flex justify-content-around" style={{ maxWidth: '716px', margin: 'auto' }}>
  <button className="btn btn-primary btn-custom" style={{ margin: '0 10px' }} onClick={() => dispatch(incrementByTen())}>
    Increment by 10
  </button>
  <button className="btn btn-primary btn-custom" style={{ margin: '0 10px' }} onClick={() => dispatch(incrementByOne())}>
    Increment by 1
  </button>
  <button className="btn btn-primary btn-custom" style={{ margin: '0 10px' }} onClick={() => dispatch(decrement())}>
    Decrement
  </button>
  <button className="btn btn-danger btn-custom" style={{ margin: '0 10px' }} onClick={() => dispatch(deleteValue())}>
    Delete
  </button>
</div>

    </div>
  );
}

export default Counter;
