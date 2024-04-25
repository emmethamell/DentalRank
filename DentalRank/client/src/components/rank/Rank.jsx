import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import Metrics from "./Metrics";
import DentalSchools from "./DentalSchools";
import "./rank.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

const Rank = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
              <Nav.Link
                style={{float: "right"}}
                className="nav-link"
                as={Link}
                to={isAuthenticated ? "/account" : "/signin"}
              >
                <Button variant="primary" style={{fontSize: "20px", padding: "5px 20px"}}>
                  SAVE RANKING
                </Button>
              </Nav.Link>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="metrics">
            <Metrics />
          </Col>
          <Col sm={8} className="dentalschools">
            <DentalSchools />
          </Col>
        </Row>
      </Container>
    </Container>

  );
};

export default Rank;
