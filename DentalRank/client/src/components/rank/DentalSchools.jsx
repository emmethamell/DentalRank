import React, { useContext, useState, useEffect } from "react";
import { School } from "./School";
import { ListGroup, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./rank.css";
import axios from "axios";

const DentalSchools = ({ schools, setSchools }) => {
  const metrics = useSelector((state) => state.metrics);

  useEffect(() => {
    axios
      .post("https://dentalrank.onrender.com/schools", metrics, { withCredentials: true })
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [metrics, setSchools]);

  return (
    <Accordion className="dentalAccordion">
      {schools.map((school, index) => (
        <School key={index} eventKey={index.toString()} school={school} />
      ))}
    </Accordion>
  );
};

export default DentalSchools;
