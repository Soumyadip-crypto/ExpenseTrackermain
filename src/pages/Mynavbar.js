import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NewNav() {
  const linkStyle = {
    color: 'white',
    padding: '10px',
    fontWeight: '200',
    justifyContent: 'center',
    textDecoration: 'none',
    fontFamily: 'Times New Roman',
    cursor: 'pointer',
    fontSize:'25px',
    marginLeft:'2px'
  };
  const link1Style = {
    color: 'white',
    padding: '10px',
    fontWeight: '200',
    justifyContent: 'center',
    textDecoration: 'none',
    fontFamily: 'Times New Roman',
    cursor: 'pointer',
    fontSize:'25px',
    marginLeft:'211px'
  };
  
  const buttonStyle = {
    color: 'white',
    backgroundColor: 'black',
    marginRight: '88px',
    borderRadius: '20px',
    border: '3px solid ',
    borderColor: '#56CCF2',
  };
  const cartStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  const logout=()=>{
    localStorage.clear('user');
    window.location.href = '/'
  }
 

  return (
    <Navbar bg="black" variant="dark" expand="lg" fixed="top" style={{borderBottom: '0.15rem solid white'}}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center" style={{ flex: 1,paddingLeft:'12px'}}>
          <Link to="/expense-form" style={link1Style}>
            Expense
          </Link>
          <Link to="/counter" style={linkStyle}>
            Counter
          </Link>
          <Link to="/about" style={linkStyle}>
            Update profile
          </Link>
        </Nav>
        <Nav className="ml-auto" style={cartStyle}>
        <Button style={buttonStyle} onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NewNav;
