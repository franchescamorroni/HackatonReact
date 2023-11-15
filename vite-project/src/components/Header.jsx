import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar className="navbar" bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">Banchile Inversiones</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>NOSOTROS</Nav.Item>
              <Nav.Item>PRODUCTOS</Nav.Item>
              <Nav.Item>MIS METAS</Nav.Item>
              <Nav.Item>RESEARCH</Nav.Item>
              <Nav.Item>APRENDE+</Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
