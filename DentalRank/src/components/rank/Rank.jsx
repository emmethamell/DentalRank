import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Metrics from "./Metrics";
import DentalSchools from "./DentalSchools";
import "./rank.css";

const Rank = () => {
  return (
    <Container>
      <h1 className="title">My Rank</h1>
      <Row className="titlerow">
        <Col sm={4}>
          <h2>Metrics</h2>
        </Col>
        <Col sm={8}>
          <h2>Dental Schools</h2>
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
  );
};

export default Rank;
