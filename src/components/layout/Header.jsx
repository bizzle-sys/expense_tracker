import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="dark" variant='dark' expand="md">
    <Container>
      <Navbar.Brand href="#home" className='text-success fw-bolder'><i className="fa-solid fa-dollar-sign"></i>Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto nav-link fs-4 gap-2">
          <Link to="/">
          <i className="fa-solid fa-right-to-bracket" title='Login'></i></Link>
          <Link to="/register"> <i className="fa-solid fa-user" title='Register'></i></Link>
          <Link to="/"><i className="fa-solid fa-right-to-bracket" title='Logout'></i></Link>
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
