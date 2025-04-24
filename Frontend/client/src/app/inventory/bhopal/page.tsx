"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import Link from "next/link";
import { link } from "fs";

import "/Users/princepatel/Downloads/inventory-management-master/client/src/app/inventory/bhopal/page.css"

function LoginPage() {
  
  return (
    <div className="main-container-3">
      {/* Navbar */}
      <nav className="navbar-3">
        
      </nav>

      {/* Login Form */}
      <div className="content-container-3">
        <h1>Welcome Back To Bhopal Inventory Page</h1>
        <br />
        <div className="button-container-3">
          <>
            <Link href="/inventory/bhopal/weapon" className="btn-3 login-btn-3">
              Weapon
            </Link>
            <Link
              href="/inventory/bhopal/vehicles"
              className="btn-3 signup-btn-3"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Vehicles
            </Link>
            <Link
              href="/inventory/bhopal/communication"
              className="btn-3 signup-btn-3"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Communication Devices
            </Link>
          </>
        </div>
    
      </div>

      
    </div>
  );
}

export default LoginPage;