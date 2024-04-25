import "./account.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import SidebarMenu from "./SidebarMenu";
import AccountDetails from "./AccountDetails";
import SavedRankings from "./SaveRankings";

const Account = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState('details');

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
    alert("Succesfully logged out!");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <Container>
      <Row className="title">
        <h1>Hello, {user.name}!</h1>
      </Row>
      <Container className="container-rank">
        <Row className="titlerow">
          <h2>
            Your Account
            <Button variant="danger" style={{float: "right", padding: "5px 20px"}} onClick={handleLogout}>LOGOUT</Button>
          </h2>
        </Row>
        <Row>
          <Col sm={4} className="metrics">
            <SidebarMenu setSelectedMenu={setSelectedMenu} />
          </Col>
          <Col sm={8} className="dentalschools">
            {selectedMenu === "details" && <AccountDetails user={user}/>}
            {selectedMenu === "rankings" && <SavedRankings />}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Account;
