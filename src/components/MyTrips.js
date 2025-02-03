import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripError, setTripError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(5);
  
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    scheduledDepartureTime: "",
    scheduledArrivalTime: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/trips/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching trips");
      setError(err.response?.data?.message || "Error fetching trips");
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const fetchTripById = async (tripId, isEditMode = false) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const tripDetails = response.data;
      setSelectedTrip(tripDetails);
      setFormData({
        flightNumber: tripDetails.flightDetails.flightNumber,
        airline: tripDetails.flightDetails.airline,
        departureAirport: tripDetails.flightDetails.departureAirport,
        arrivalAirport: tripDetails.flightDetails.arrivalAirport,
        scheduledDepartureTime: tripDetails.flightDetails.scheduledDepartureTime,
        scheduledArrivalTime: tripDetails.flightDetails.scheduledArrivalTime,
      });
      
      setIsEditing(isEditMode);
      setTripError(null);
    } catch (err) {
      toast.error("Error fetching trip details");
      setTripError(err.response?.data?.message || "Error fetching trip details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updateTripById = async (tripId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/trips/${tripId}`, 
        { flightDetails: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Trip updated successfully");
      fetchTrips(); // Refresh the trips list
      closeDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating trip");
      setUpdateError(err.response?.data?.message || "Error updating trip");
    }
  };

  const deleteTripById = async (tripId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Trip deleted successfully");
      fetchTrips(); // Refresh the trips list
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting trip");
    }
  };

  const closeDetails = () => {
    setSelectedTrip(null);
    setIsEditing(false);
    setFormData({
      flightNumber: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      scheduledDepartureTime: "",
      scheduledArrivalTime: "",
    });
  };

  // Pagination component
  const PaginationControls = () => (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="d-flex align-items-center">
        <span className="me-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
      <div>
        <span>Total trips: {trips.length}</span>
      </div>
    </div>
  );

  return (
    <div className="my-trips-container p-4">
      <div className="my-trips-card">
        <h2 className="text-center mb-4">My Trips</h2>
        {loading ? (
          <p>Loading trips...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="d-none d-md-table-cell">Flight Number</th>
                    <th>Airline</th>
                    <th className="d-none d-lg-table-cell">Departure</th>
                    <th className="d-none d-lg-table-cell">Arrival</th>
                    <th className="d-none d-md-table-cell">Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{height:'200px'}}>
  {currentTrips.length > 0 ? (
    currentTrips.map((trip) => (
      <tr key={trip._id}>
        <td className="d-none d-md-table-cell">{trip.flightDetails.flightNumber}</td>
        <td>{trip.flightDetails.airline}</td>
        <td className="d-none d-lg-table-cell">
          {new Date(trip.flightDetails.scheduledDepartureTime).toLocaleString()}
        </td>
        <td className="d-none d-lg-table-cell">
          {new Date(trip.flightDetails.scheduledArrivalTime).toLocaleString()}
        </td>
        <td className="d-none d-md-table-cell">{trip.status}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => fetchTripById(trip._id, false)}
            >
              <FaEye />
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => fetchTripById(trip._id, true)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this trip?")) {
                  deleteTripById(trip._id);
                }
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center text-muted">No data available</td>
    </tr>
  )}
</tbody>

              </table>
            </div>
            <PaginationControls />
          </>
        )}

        {selectedTrip && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Edit Trip Details" : "Trip Details"}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeDetails}></button>
                </div>
                <div className="modal-body">
                  {tripError ? (
                    <p className="text-danger">{tripError}</p>
                  ) : (
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Flight Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="flightNumber"
                          value={formData.flightNumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Airline</label>
                        <input
                          type="text"
                          className="form-control"
                          name="airline"
                          value={formData.airline}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Departure Airport</label>
                        <input
                          type="text"
                          className="form-control"
                          name="departureAirport"
                          value={formData.departureAirport}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Arrival Airport</label>
                        <input
                          type="text"
                          className="form-control"
                          name="arrivalAirport"
                          value={formData.arrivalAirport}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Departure Time</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="scheduledDepartureTime"
                          value={formData.scheduledDepartureTime?.slice(0, 16)}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Arrival Time</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="scheduledArrivalTime"
                          value={formData.scheduledArrivalTime?.slice(0, 16)}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="modal-footer">
                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateTripById(selectedTrip._id)}
                    >
                      Save Changes
                    </button>
                  )}
                  <button type="button" className="btn btn-secondary" onClick={closeDetails}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {updateError && <p className="text-danger mt-3">{updateError}</p>}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MyTrips;