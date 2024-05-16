import React, { useState, useEffect } from "react";
import styles from "./signin.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post(
        "https://dentalrank.onrender.com/api/signin",
        user,
        { withCredentials: true }
      );

      setUser(response.data);
      console.log(response.data);

      if (response.data.message === "Signed in successfully") {
        navigate("/");
        dispatch(login());
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

  return (
    <div className={styles["sign-in-page"]}>
      <h2>Login</h2>
      <h6>Please enter your email and password!</h6>
      <div style={{ padding: "30px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className={styles["signin-button"]} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div style={{ paddingTop: "30px", borderTop: "1px solid #808080" }}>
        <h6>
          Don't have an account?{" "}
          <Nav.Link className={`${styles['nav-link']} ${styles['signin-link']}`} as={Link} to="/signup">
            Sign Up
          </Nav.Link>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
