import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";



export const NewSchool = ({ school, eventKey }) => {

  return (
    <>
    <Accordion defaultActiveKey="0">
    <Card>
      <Card.Header>
        HEADER
      </Card.Header>
        <Card.Body>Hello! I'm the body</Card.Body>
    </Card>
    <Card>
      <Card.Header>
        ANOTHER HEADER
      </Card.Header>
        <Card.Body>Hello! I'm another body</Card.Body>
    </Card>
  </Accordion>
  </>
  );
};
