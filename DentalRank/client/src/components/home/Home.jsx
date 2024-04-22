import React from 'react';
import "./home.css"

const Home = () => {
    return (
        <div className="home">
            <div className="jumbotron">
                <h1 className="display-4">Rank your Dental Schools</h1>
                <p className="lead">Choose what matters most to you in order to rank dental schools</p>
                <a className="btn btn-primary btn-lg" href="/rank" role="button">Create your Ranking</a>
            </div>
        </div>
    );
};

export default Home
