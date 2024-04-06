import React, { useContext } from 'react';
import { Accordion, Form, Row, Col } from 'react-bootstrap';
import MetricsContext from './MetricsContext';

const MetricItem = ({ eventKey, header, body, minPlaceholder, maxPlaceholder }) => {
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
                                <Form.Label>Min</Form.Label>
                                <Form.Control type="number" placeholder={minPlaceholder} onChange={handleMinChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`formMax${eventKey}`}>
                                <Form.Label>Max</Form.Label>
                                <Form.Control type="number" placeholder={maxPlaceholder} onChange={handleMaxChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default MetricItem;