import { Container, Row, Col, Button } from "react-bootstrap";
import Metrics from "./Metrics";
import DentalSchools from "./DentalSchools";
import "./rank.css";


const Rank = () => {
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
              <Button variant="primary" style={{float:"right"}}>Save Ranking</Button>{''}
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
