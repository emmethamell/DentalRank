import React from 'react';
import "./rank.css"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Metrics from "./Metrics"
import DentalSchools from "./DentalSchools"

const Rank = () => {
    return (
        <Container>
            <h1 className="title">My Rank</h1>
            <Row>
                <Col sm={4} className="metrics">
                    <Metrics />
                </Col>
                <Col sm={8} className="dentalschools">
                    <DentalSchools /> 
                </Col>
            </Row>
        </Container>
    )
}

export default Rank