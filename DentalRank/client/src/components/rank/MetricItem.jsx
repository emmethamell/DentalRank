import React, { useContext, useEffect } from "react";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import "./rank.css";

import { useDispatch, useSelector } from "react-redux";
import { updateMetrics } from "../../redux/metricsSlice"; 


const MetricItem = ({
  eventKey,
  header,
  body,
  minPlaceholder,
  maxPlaceholder,
}) => {

  const metrics = useSelector((state) => state.metrics); 
  const dispatch = useDispatch();

  const handleMinChange = (e) => {
    const currentMetrics = metrics[eventKey] || {};
    dispatch(updateMetrics({ key: eventKey, min: Number(e.target.value), max: currentMetrics.max }));
  };
  
  const handleMaxChange = (e) => {
    const currentMetrics = metrics[eventKey] || {};
    dispatch(updateMetrics({ key: eventKey, min: currentMetrics.min, max: Number(e.target.value) }));
    console.log(metrics);

  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>
        {body}
        <Form className="p-2">
          <Row>
            <Col>
              <Form.Group controlId={`formMin${eventKey}`}>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Label>Min:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={minPlaceholder}
                      onChange={handleMinChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formMax${eventKey}`}>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Label>Max: </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={maxPlaceholder}
                      onChange={handleMaxChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MetricItem;
