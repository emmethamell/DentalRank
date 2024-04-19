import React, { useContext, useState, useEffect } from "react";
import { School } from './School';
import { ListGroup, Accordion } from "react-bootstrap";
import MetricsContext from "./MetricsContext";
import "./rank.css";
const DentalSchools = () => {
  const { metrics } = useContext(MetricsContext);
  const [schools, setSchools] = useState([]);
 
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
   <Accordion className="dentalAccordion">
    {schools.map((school, index) => (
      <School key={index} eventKey={index.toString()} school={school} />
    ))}
  </Accordion>
  );
};

export default DentalSchools;
