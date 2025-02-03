import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomePic from './image.png'
// Import a more relevant vector image related to travel confirmation
//import travelVector from "../assets/travel-vector.png"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Student Travel Confirmation System</h1>
        <p>
          Register your travel details, confirm your safe arrival, and notify 
          your relatives effortlessly. Secure and reliable travel confirmation for students.
        </p>
        <Link to="/register">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
      <div className="image-container">
        <img src={HomePic} />
      </div>
    </div>
  );
};

export default Home;
