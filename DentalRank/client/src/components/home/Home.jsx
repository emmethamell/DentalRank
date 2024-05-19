import React from "react";
import Footer from "../footer/Footer";
import "./home.css";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="jumbotron">
          <h1 className="display-4">Rank your Dental Schools</h1>
          <p className="lead">
            Choose what matters most to you in order to rank dental schools
          </p>
          <a className="btn btn-primary btn-lg" role="button">
            <Nav.Link className="nav-link" as={Link} to="/rank">
              Create your Ranking
            </Nav.Link>
          </a>
        </div>
      </div>
      <div className="footer-home">
        <Footer />
      </div>
    </>
  );
};

export default Home;
