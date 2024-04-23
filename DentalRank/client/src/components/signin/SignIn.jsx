import React, { useState, useEffect } from "react";
import "./signin.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/signin",
        user
      );

      setUser(response.data);
      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);

      if (response.data.message === "Signed in successfully") {
        navigate("/");
        alert("Success!");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  if (user) {
    return (
      <div style={{ padding: "50px" }}>{user.name} is logged in</div>
    );
  }

  return (
    <div className="sign-in-page">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <Nav.Link className="nav-link" as={Link} to="/signup">
          <h4>
            <Badge bg="primary">Create Account</Badge>
          </h4>
        </Nav.Link>
      </div>
    </div>
  );
};

export default SignIn;
