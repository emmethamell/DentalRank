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
    </ListGroup>
  );
};

export default DentalSchools;
