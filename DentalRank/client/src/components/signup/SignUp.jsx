import styles from"./signup.module.css";
import axios from "axios";
import { Form, Button, Nav, Badge } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      //TODO: Change to popup
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://dentalrank.onrender.com/api/signup", {
        name,
        email,
        password,
      });

      console.log(response.data);

      //Redirect to home page and display a popup
      navigate("/");

      //Change to better popup
      alert("Please verify you email");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["sign-up-page"]}>
      <h2>Create Account</h2>
      <h6>Sign up to create and save customized rankings</h6>
      <div style={{ padding: "30px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className={styles["signup-button"]} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div style={{ paddingTop: "30px", borderTop: "1px solid #808080" }}>
        <h6>
          Already have an account?{" "}
          <Nav.Link className={`${styles['nav-link']} ${styles['signup-link']}`} as={Link} to="/signin">
            Login
          </Nav.Link>
        </h6>
      </div>
    </div>
  );
};

export default SignUp;
