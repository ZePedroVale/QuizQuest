//#Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Quiz Quest</h1>
      <Link to="/login"><button className="play-button">PLAY</button></Link>
      <div className="action-buttons">
        <Link to="/register" className="btn btn-primary">Create account</Link>
        <Link to="/guestcategories" className="btn btn-secondary">Play as guest</Link>
      </div>
    </div>
  );
}

export default Home;
