import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import external styles for better design
import { ToastContainer, toast } from 'react-toastify'; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passportNumber: "",
    emergencyContact: {
      name: "",
      relationship: "",
      email: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false); // Loading state for submission

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("emergencyContact")) {
      const key = name.split(".")[1]; // Extract nested key
      setFormData((prevData) => ({
        ...prevData,
        emergencyContact: { ...prevData.emergencyContact, [key]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://travel-backend-pzzf.onrender.com/api/auth/register`,
        formData
      );
      console.log("Registration Successful:", response.data);
      toast.success("Registration Successful!"); // Show success notification
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
      toast.error("Registration Failed!"); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" >
      <div className="register-card">
        <h2 className="text-center mb-4">Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <h4 className="section-title">Emergency Contact</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="emergencyContact.name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Relationship</label>
              <input
                type="text"
                name="emergencyContact.relationship"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="emergencyContact.email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="emergencyContact.phone"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Display Toast notifications */}
    </div>
  );
};

export default Register;
