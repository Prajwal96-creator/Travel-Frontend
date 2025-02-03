import React from "react";
import "./Features.css"; // Import the CSS file for styling
import "./Features.css";

const Features = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Features</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="feature-card">
            <div className="card-body text-center">
              <i className="fas fa-user-graduate fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Student Travel Registration</h5>
              <p className="card-text">
                Students can securely submit their travel details, including passport and flight information.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card">
            <div className="card-body text-center">
              <i className="fas fa-chart-line fa-3x text-success mb-3"></i>
              <h5 className="card-title">Automated Arrival Confirmation</h5>
              <p className="card-text">
                Students receive an email upon arrival to confirm their safe landing.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card">
            <div className="card-body text-center">
              <i className="fas fa-envelope fa-3x text-danger mb-3"></i>
              <h5 className="card-title">Relative Notification System</h5>
              <p className="card-text">
                Once the student confirms arrival, their designated relative is instantly notified via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
