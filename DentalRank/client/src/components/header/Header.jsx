import React, { useState, useEffect} from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/tooth.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../../redux/authSlice";

const Header = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus())
  },[dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading)
  const error = useSelector((state) => state.auth.error)

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary justify-content-center"
      bg="light"
      fixed="top"
      style={{ padding: "20px 0" }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            marginLeft: "50px",
            display: "flex",
            alignItems: "center",
            fontSize: "1.9em",
          }}
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: "50px", alignItems: "center"}}>
            <Nav.Link className="nav-link" as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/rank">
              RANK
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/compare">
              COMPARE
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to={isAuthenticated ? "/account" : "/signin"} >
                <Button variant="primary" style={{padding: "5px 25px"}}>
                {isAuthenticated ? "ACCOUNT" : "SIGN IN"}
                </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
