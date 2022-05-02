import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

function Header() {
  return (
    <div className="app-header">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home"><FaHome /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;