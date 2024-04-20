import React, { useState } from "react";
import { Container, Accordion, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./rank.css";
import ListGroup from 'react-bootstrap/ListGroup'

export const School = ({ school, eventKey }) => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <div>
      <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        <Card
          className="card-padding"
          style={{ border: "none", display: "flex" }}
        >
          <Accordion.Item
            eventKey={eventKey}
            style={{ border: "1px solid #000", outline: "none", overflow: 'hidden'}}
          >
            <Container style={{padding:"0"}} fluid>
            <Row style={{ display: "flex"}}>
              <Col
                lg={1}
                md={2}
                sm={2}
                xs={3}
                className="text-center"
                style={{ alignSelf: "center"}}
              >
                <div className="number">{Number(eventKey) + 1 + "."}</div>
              </Col>
              <Col
                lg={11}
                md={10}
                sm={10}
                xs={9}
                style={{ alignSelf: "center"}}
              >
                <Accordion.Header style={{}}>
                  <Card.Header className="header-text">
                    {school.name}
                  </Card.Header>
                </Accordion.Header>
              </Col>
            </Row>
            </Container>
            <div
              style={{
                borderTop: activeKey === eventKey ? "1px solid #000" : "none",
              }}
            >

              <Accordion.Body>
                <Row
                  className="custom-border-bottom"
                  style={{ margin: "0 -20px" }}
                >
                  <Col style={{ padding: "0px 15px 10px" }}>Mean GPA (Overall / Science):</Col>
                  <Col style={{ padding: "0px 15px 10px" }}>
                    {school.gpa_overall + " / " + school.gpa_science}
                  </Col>
                </Row>
                <Row
                  className="custom-border-bottom"
                  style={{ margin: "0 -20px" }}
                >
                  <Col style={{ padding: "10px 15px" }}>Mean DAT (Overall / Science / Perceptual):</Col>
                  <Col style={{ padding: "10px 15px" }}>
                    {school.dat_overall + " / " + school.dat_science + " / " + school.dat_perceptual}
                  </Col>
                </Row>
                <Row
                  className="custom-border-bottom"
                  style={{ margin: "0 -20px" }}
                >
                  <Col style={{ padding: "10px 15px" }}>Acceptance Rate:</Col>
                  <Col style={{ padding: "10px 15px" }}>
                    {school.percent + "%"}
                  </Col>
                </Row>
                <Row 
                  style={{ margin: "0 -20px" }}
                >
                  <Col style={{ padding: "10px 20px 0px" }}>Location:</Col>
                  <Col style={{ padding: "10px 20px 0px" }}>
                    {school.location}
                  </Col>
                </Row>
              </Accordion.Body>

            </div>
          </Accordion.Item>
        </Card>
      </Accordion>

    </div>
  );
};
