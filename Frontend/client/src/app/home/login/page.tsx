"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import "./login.css";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

function LoginPage() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:1234/api/auth/login",
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { token, message } = response.data;
  
      alert(message);
  
      // Store session information
      localStorage.setItem("token", token); // For authentication
      localStorage.setItem("isLoggedIn", "true"); // Simulating a session
  
      // Redirect to dashboard or protected page
      window.location.href = "/dashboard"; // Replace with the correct route
    } catch (error: any) {
      console.error(error);
  
      if (error.response) {
        // Handle errors from the backend
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        // Handle network errors or other errors
        alert("An error occurred. Please try again later.");
      }
  
      // Set session to false on failure
      localStorage.setItem("isLoggedIn", "false");
    }
  };

  return (
    <div className="main-container-15">
  {/* Navbar */}
  <nav className="navbar-15">
    <div className="navbar-logo-15">
      <span>Police Inventory</span>
    </div>
  </nav>

  {/* Login Form */}
  <div className="content-container-15">
    <h1 className="h1-15">Welcome Back</h1>
    <p>Log in to access your account.</p>

    <form className="login-form-15" onSubmit={handleSubmit}>
      <div className="form-group-15">
        <label htmlFor="email" className="label-15">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-15"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group-15">
        <label htmlFor="password" className="label-15">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-15"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-15">
        Log In
      </button>
    </form>
  </div>

  {/* Footer */}
  <footer className="footer-15">
    <p>&copy; 2024 Police Inventory Management. All rights reserved.</p>
    <p>
      Contact us:{" "}
      <a href="mailto:support@policeinventory.com">support@policeinventory.com</a>
    </p>
  </footer>
</div>
  );
}

export default LoginPage;