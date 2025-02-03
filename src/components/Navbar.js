import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <span className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            MyApp
          </span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/trip-details")}>
                    Trip Details
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/my-trips")}>
                    My Trips
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/register")}>
                    Register
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate("/login")}>
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
