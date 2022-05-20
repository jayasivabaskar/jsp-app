import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaHome, FaShoppingCart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdClear } from "react-icons/md";

function Header() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="app-header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><FaHome /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <div className="searchBox">
            <input 
              type="text" 
              placeholder="search..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
            />
            { inputValue && 
              <span 
                className="clearIcon" 
                onClick={() => setInputValue("")} 
                role="presentation"
              >
                <MdClear />
              </span>
            }
          </div>
          <IconContext.Provider
            value={{ color: "white", size: "25px" }}
          >
            <div className="cartIcon">
              <FaShoppingCart />
            </div>
            <div className="searchIcon">
              <FaSearch />
            </div>
            <div className="profileImage">
              <CgProfile />
            </div>
          </IconContext.Provider>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;