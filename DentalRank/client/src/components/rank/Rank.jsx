import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import Metrics from "./Metrics";
import DentalSchools from "./DentalSchools";
import "./rank.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Rank = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const handleSaveRanking = async () => {
    if (isAuthenticated) {
      try {
        let response = await axios.put(
          "https://dentalrank.onrender.com/api/save-ranking",
          schools,
          {
            withCredentials: true,
          }
        );
        if (response.data.message === "EVERYTHING OK") {
          alert("Saved Ranking!");
        }
      } catch (err) {
        console.error("Error saving ranking: ", err);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <Container>
      <Row className="title">
        <h1>My Rank</h1>
        <h5>Create your own dental school rankings</h5>
      </Row>
      <Container className="container-rank">
        <Row className="titlerow">
          <Col sm={4}>
            <h2>Metrics</h2>
          </Col>
          <Col sm={8} className="dental-title">
            <h2>
              Dental Schools
              <Button
                variant="primary"
                style={{
                  float: "right",
                  fontSize: "20px",
                  padding: "5px 20px",
                }}
                onClick={handleSaveRanking}
              >
                SAVE RANKING
              </Button>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="metrics">
            <div className="metrics-info">
              <p>
              Select minimum and/or maximum values for any of the provided metrics to discover which dental schools match your criteria. For instance, if you seek a dental school with a mean GPA below 3.7, enter 3.7 where indicated under "Max".
              </p>
            </div>
            <Metrics />
          </Col>
          <Col sm={8} className="dentalschools">
            <DentalSchools schools={schools} setSchools={setSchools} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Rank;
