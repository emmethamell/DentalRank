import React, { useState }from "react";
import Compare from "../compare/Compare";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SavedRankings = ({ user }) =>  {

  return (
  <div>
    <h2>Saved Rankings</h2>
    {user.rankings && user.rankings.length > 0 ? (

      // User has rankings
      <ListGroup>
      {user.rankings.map((ranking, index) => (
        <div className="m-3" key={index}>
            <h4>RANKING {index + 1} </h4>
            {ranking.map((school, schoolIndex) => (
              <ListGroup.Item key={schoolIndex}>
                {school.name}
              </ListGroup.Item>
            ))}
        </div>
      ))}
      
      </ListGroup>
    ) : (
      // User has no rankings
      <h3>No saved rankings</h3>
    )}
  </div>
  );
};

export default SavedRankings;
