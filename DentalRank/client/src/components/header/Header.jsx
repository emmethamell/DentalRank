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
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(checkAuthStatus())
  },[dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading)
  const error = useSelector((state) => state.auth.error)

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      collapseOnSelect={true}
      className="bg-body-tertiary justify-content-center"
      bg="light"
      fixed="top"
      style={{ padding: "20px 0" }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="nav-brand"
          style={{
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
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" style={{ marginRight: '20px' }}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{alignItems: "center"}}>
            <Nav.Link onClick={() => setExpanded(false)} className="nav-link" as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link onClick={() => setExpanded(false)} className="nav-link" as={Link} to="/rank">
              RANK
            </Nav.Link>
            <Nav.Link onClick={() => setExpanded(false)} className="nav-link" as={Link} to={isAuthenticated ? "/account" : "/signin"} >
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
