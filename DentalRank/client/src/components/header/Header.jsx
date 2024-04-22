import React from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from 'react-bootstrap/Badge';
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/tooth.png";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-center" bg="light" fixed="top" style={{padding:'20px 0'}}>
      <Container>
        <Navbar.Brand
          href="/"
          style={{ marginLeft:"50px", display: "flex", alignItems: "center", fontSize: "1.9em" }}
        >
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="DentalRank logo"
          />
          DentalRank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{marginRight:"50px"}}>
            <Nav.Link className="nav-link" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/rank">
              Rank
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/compare">
              Compare
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/signin">
              <h4>
              <Badge bg="primary">Sign In</Badge>
              </h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
