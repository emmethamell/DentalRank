import "./account.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import SidebarMenu from "./SidebarMenu";
import AccountDetails from "./AccountDetails";
import SavedRankings from "./SavedRankings";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState('details');

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        "https://dentalrank.onrender.com/api/get-user-info", 
        { withCredentials: true }
      );
      setUser(res.data);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://dentalrank.onrender.com/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(logout());
        alert("Logged out!");
        navigate("/")
      } else {
        alert("Failed to logout");
      }
    }catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };

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
            {selectedMenu === "rankings" && <SavedRankings user={user}/>}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Account;
