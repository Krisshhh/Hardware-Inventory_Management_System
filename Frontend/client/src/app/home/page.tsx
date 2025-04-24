"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./home.css";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check the session value on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); // Update session value
    setIsLoggedIn(false); // Update state
    alert("You have been logged out.");
  };

  return (
    <div className="main-container-1">
      {/* Navbar */}
      <nav className="navbar-1">
        <div className="navbar-logo-1">
          <img src="/images/logo.jpeg" alt="Logo" className="logo-image-1" />
          <span className="logo-text-1">Police Inventory</span>
        </div>
      </nav>

      {/* Homepage Content */}
      <main className="content-container-1">
        <h1 className="headline-1">Streamline Police Inventory Management</h1>
        <p className="subtext-1">
          Gain full control and real-time visibility over police department
          inventory to optimize operations, reduce loss, and ensure officers
          always have the equipment they need, when they need it.
        </p>

        <div className="info-section-1">
          <div className="info-card-1">
            <h3>Effortless Optimization</h3>
            <p>
              Our system enables seamless inventory tracking, reduces manual
              errors, and streamlines supply management with intuitive and
              user-friendly features.
            </p>
          </div>
          <div className="info-card-1">
            <h3>Centralized Oversight</h3>
            <p>
              Managing police inventory can be challenging. Let us simplify it
              by providing a centralized system to monitor and allocate
              resources efficiently.
            </p>
          </div>
          <div className="info-card-1">
            <h3>Customizable for Every Department</h3>
            <p>
              Whether you’re managing a single precinct or coordinating across
              stations, our platform adapts to your needs.
            </p>
          </div>
        </div>

        <div className="button-container-1">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-1 logout-btn-1" style={{ backgroundColor: "#007bff", color: "#fff" }}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/home/login" className="btn-1 login-btn-1" >
                Login
              </Link>
              <Link href="/home/signup" className="btn-1 signup-btn-1" style={{ backgroundColor: "#007bff", color: "#fff" }}>
                Signup
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-1">
        <p>
          &copy; {new Date().getFullYear()} Police Inventory Management. All
          rights reserved.
        </p>
        <p>
          Contact us:{" "}
          <a href="mailto:support@policeinventory.com" className="contact-link-1">
            support@policeinventory.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Homepage;