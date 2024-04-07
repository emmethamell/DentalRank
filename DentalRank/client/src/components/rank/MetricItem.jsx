import React, { useContext } from "react";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import MetricsContext from "./MetricsContext";
import "./rank.css";
const MetricItem = ({
  eventKey,
  header,
  body,
  minPlaceholder,
  maxPlaceholder,
}) => {
  const { metrics, updateMetrics } = useContext(MetricsContext);

  const handleMinChange = (e) => {
    const currentMetrics = metrics[eventKey] || {};
    updateMetrics(eventKey, e.target.value, currentMetrics.max);
  };

  const handleMaxChange = (e) => {
    const currentMetrics = metrics[eventKey] || {};
    updateMetrics(eventKey, currentMetrics.min, e.target.value);
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>
        {body}
        <Form>
          <Row>
            <Col>
              <Form.Group controlId={`formMin${eventKey}`}>
                <Row>
                  <Col xs="auto">
                    <Form.Label>Min: </Form.Label>
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
                <Row>
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
