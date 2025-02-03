import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
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
        <img src="https://files.oaiusercontent.com/file-VjBZWXQAcWDGYFR1a5MCCZ?se=2025-02-01T06%3A17%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D3b700b2c-c4ac-4610-8f0d-c167c24e7c58.webp&sig=XGnjQf40/4yad4RrFIMpgrd7pAu5vsSyZOq33WlpoZ8%3D" alt="Travel Confirmation" />
      </div>
    </div>
  );
};

export default Home;
