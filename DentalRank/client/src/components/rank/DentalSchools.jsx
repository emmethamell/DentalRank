import React, { useContext, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import MetricsContext from "./MetricsContext";
import "./rank.css";
const DentalSchools = () => {
  const { metrics } = useContext(MetricsContext);
  const [schools, setSchools] = useState([]);
  /* 
  send metrics and return a list of strings of schools

  UPDATE: the return (and what will end up being equal to 'schools' variable)
  will be a list of objects, each with attributes for gpa, dat, etc. This way
  for the accordion you can easily reference each schools attribute.
  */
 
  useEffect(() => {
    fetch("http://localhost:3001/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metrics),
    })
      .then((response) => response.json())
      .then((data) => {
        // update the schools
        setSchools(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [metrics]);

  return (
    <ListGroup>
      {schools.map((school, index) => (
        <ListGroup.Item key={index}>{school}</ListGroup.Item>
      ))}

      {
        JSON.stringify(
          metrics
        ) /* for testing displaying what metrics looks like, this is what gets sent to the server*/
      }

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
