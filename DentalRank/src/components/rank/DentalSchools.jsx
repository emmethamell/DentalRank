import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import MetricsContext from "./MetricsContext";
import "./rank.css";
const DentalSchools = () => {
  const { metrics } = useContext(MetricsContext);
  return (
    <ListGroup>
      <ListGroup.Item>School 1</ListGroup.Item>
      <ListGroup.Item>School 2</ListGroup.Item>
      <ListGroup.Item>School 3</ListGroup.Item>
      <ListGroup.Item>School 4</ListGroup.Item>

      <h4>
        GPA - Min: {metrics["0"]?.min || "N/A"} Max:{" "}
        {metrics["0"]?.max || "N/A"}
      </h4>
      <h4>
        DAT - Min: {metrics["1"]?.min || "N/A"} Max:{" "}
        {metrics["1"]?.max || "N/A"}
      </h4>
      <h4>
        Acceptance - Min: {metrics["2"]?.min || "N/A"} Max:{" "}
        {metrics["2"]?.max || "N/A"}
      </h4>
      <h4>
        Student to Faculty - Min: {metrics["3"]?.min || "N/A"} Max:{" "}
        {metrics["3"]?.max || "N/A"}
      </h4>
    </ListGroup>
  );
};

export default DentalSchools;
