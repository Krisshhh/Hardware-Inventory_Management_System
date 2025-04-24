"use client";

import React, { useState } from "react";
import "./signup.css";
import axios from "axios";

function SignupPage() {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for handling submission status or errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(""); // Clear previous errors

    try {
      // Make POST request to signup endpoint
      const response = await axios.post("http://localhost:1234/api/auth/signup", formData);

      // Handle successful signup
      alert(response.data.message || "Signup successful!");

      // Redirect to login page or desired route
      window.location.href = "/home/login";
    } catch (err: any) {
      // Handle error
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="content-container-20">
  <h1>Create Your Account</h1>

  {/* Display Error Message */}
  {error && <p className="error-message-20">{error}</p>}

  <form className="signup-form-20" onSubmit={handleSubmit}>
    {/* Name Field */}
    <div className="form-group-20">
      <label htmlFor="name" className="label-20">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        className="input-20"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />
    </div>

    {/* Email Field */}
    <div className="form-group-20">
      <label htmlFor="email" className="label-20">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        className="input-20"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
    </div>

    {/* Password Field */}
    <div className="form-group-20">
      <label htmlFor="password" className="label-20">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        className="input-20"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />
    </div>

    {/* Submit Button */}
    <button type="submit" disabled={loading} className="button-20">
      {loading ? "Signing Up..." : "Sign Up"}
    </button>
  </form>
</div>
  );
}

export default SignupPage;