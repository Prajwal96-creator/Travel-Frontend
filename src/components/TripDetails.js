import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./TripDetails.css";
import "react-toastify/dist/ReactToastify.css";

const TripDetails = () => {
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    scheduledDepartureTime: "",
    scheduledArrivalTime: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate datetime
    const departureTime = new Date(formData.scheduledDepartureTime);
    const arrivalTime = new Date(formData.scheduledArrivalTime);

    if (departureTime >= arrivalTime) {
      toast.error("Arrival time must be after departure time");
      setLoading(false);
      return;
    }

    const postData = { flightDetails: formData };

    try {
      const response = await axios.post("http://localhost:5000/api/trips/", postData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Flight ${formData.flightNumber} added successfully!`);

      // Reset the form after successful submission
      setFormData({
        flightNumber: "",
        airline: "",
        departureAirport: "",
        arrivalAirport: "",
        scheduledDepartureTime: "",
        scheduledArrivalTime: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit flight details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-container">
      <div className="trip-card">
        <h2 className="text-center mb-4">Enter Flight Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Flight Number</label>
            <input 
              type="text" 
              name="flightNumber" 
              className="form-control" 
              value={formData.flightNumber} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Airline</label>
            <input 
              type="text" 
              name="airline" 
              className="form-control" 
              value={formData.airline} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Departure Airport</label>
            <input 
              type="text" 
              name="departureAirport" 
              className="form-control" 
              value={formData.departureAirport} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Arrival Airport</label>
            <input 
              type="text" 
              name="arrivalAirport" 
              className="form-control" 
              value={formData.arrivalAirport} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Scheduled Departure Time</label>
            <input 
              type="datetime-local" 
              name="scheduledDepartureTime" 
              className="form-control" 
              value={formData.scheduledDepartureTime} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Scheduled Arrival Time</label>
            <input 
              type="datetime-local" 
              name="scheduledArrivalTime" 
              className="form-control" 
              value={formData.scheduledArrivalTime} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Flight Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripDetails;