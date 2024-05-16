import React from "react";
import { ListGroup, Accordion, Card, Button, Form } from "react-bootstrap";
import MetricItem from "./MetricItem";
import "./rank.css";

const Metrics = () => {
  return (
    <ListGroup >
      <Accordion defaultActiveKey="0" flush>
        <MetricItem
          eventKey="gpa"
          header="Mean GPA"
          body="The median undergraduate GPA of applicants admitted"
          minPlaceHolder="3.1"
          maxPlaceHolder="3.5"
        />
        <MetricItem
          eventKey="dat"
          header="Mean DAT"
          body="The median DAT score of applicants admitted"
          minPlaceHolder="13"
          maxPlaceHolder="20"
        />
        <MetricItem
          eventKey="app_admit"
          header="Acceptance Rate"
          body="Percentage of applicants admitted"
          minPlaceHolder="0"
          maxPlaceHolder="100"
        />
      </Accordion>
    </ListGroup>
  );
};

export default Metrics;
