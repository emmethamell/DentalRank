import React from 'react';
import { ListGroup, Accordion, Card, Button, Form } from 'react-bootstrap';
import MetricItem from "./MetricItem"

const Metrics = () => {
    return (
        <ListGroup>
            <Accordion defaultActiveKey="0">
                <MetricItem 
                    eventKey="0"
                    header="Median GPA"
                    body="The median undergraduate GPA of applicants admitted"
                    minPlaceHolder="3.1"
                    maxPlaceHolder="3.5"
                />
                <MetricItem 
                    eventKey="1"
                    header="Median DAT"
                    body="The median DAT score of applicants admitted"
                    minPlaceHolder="13"
                    maxPlaceHolder="20"
                />
                <MetricItem 
                    eventKey="2"
                    header="Acceptance Rate"
                    body="Percentage of applicants admitted"
                    minPlaceHolder="50"
                    maxPlaceHolder="90"
                />
                <MetricItem 
                    eventKey="3"
                    header="Student to faculty ratio"
                    body="The number of dental students per one full time faculty member"
                    minPlaceHolder="1"
                    maxPlaceHolder="30"
                />
            </Accordion>
        </ListGroup>
    );
};

export default Metrics