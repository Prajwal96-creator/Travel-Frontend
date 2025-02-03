import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css"; // Import custom styles

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, student } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(student));

      toast.success("Login Successful!", { autoClose: 2000 });

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer /> {/* Toast Notifications */}
      <div className="login-card">
        <h2 className="text-center">Welcome Back!</h2>
        <p className="text-center">Please enter your credentials to log in.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Email</label>

            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
