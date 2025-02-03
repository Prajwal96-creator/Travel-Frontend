import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap Components

import "./Profile.css";



const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://travel-backend-pzzf.onrender.com/api/students/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch profile!");
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setEditedUser(user); // Reset changes if closed without saving
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("emergencyContact")) {
      const key = name.split(".")[1];
      setEditedUser((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [key]: value },
      }));
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      // Create a copy of editedUser without the email field
      const { email, ...updatedData } = editedUser;
  
      const response = await axios.put(`https://travel-backend-pzzf.onrender.com/api/students/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUser(response.data); // Update UI with new data
      setShowModal(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile!");
    }
  };
  

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="text-center mb-4">Profile</h2>
        <div className="mb-3"><strong>Name:</strong> {user.firstName} {user.lastName}</div>
        <div className="mb-3"><strong>Email:</strong> {user.email}</div>
        <div className="mb-3"><strong>Passport Number:</strong> {user.passportNumber}</div>

        <h4 className="section-title">Emergency Contact</h4>
        <div className="mb-3"><strong>Name:</strong> {user.emergencyContact.name}</div>
        <div className="mb-3"><strong>Relationship:</strong> {user.emergencyContact.relationship}</div>
        <div className="mb-3"><strong>Email:</strong> {user.emergencyContact.email}</div>
        <div className="mb-3"><strong>Phone:</strong> {user.emergencyContact.phone}</div>

        <button className="btn btn-primary w-100" onClick={handleShow}>Edit Profile</button>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={editedUser.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={editedUser.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Passport Number</Form.Label>
              <Form.Control type="text" name="passportNumber" value={editedUser.passportNumber} onChange={handleChange} />
            </Form.Group>

            <h5>Emergency Contact</h5>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="emergencyContact.name" value={editedUser.emergencyContact.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Relationship</Form.Label>
              <Form.Control type="text" name="emergencyContact.relationship" value={editedUser.emergencyContact.relationship} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="emergencyContact.email" value={editedUser.emergencyContact.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="emergencyContact.phone" value={editedUser.emergencyContact.phone} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
