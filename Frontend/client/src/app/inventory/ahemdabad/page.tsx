"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import Link from "next/link";

import "/Users/princepatel/Downloads/inventory-management-master/client/src/app/inventory/ahemdabad/page.css"

function LoginPage() {
  
  return (
    <div className="main-container-7">
      {/* Navbar */}
      <nav className="navbar-7">
        
      </nav>

      {/* Login Form */}
      <div className="content-container-7">
        <h1>Welcome Back To Ahmedabad Inventory Page</h1>
        <br />
        <div className="button-container-7">
          <>
            <Link href="/inventory/ahemdabad/weapon" className="btn-7 login-btn-7">
              Weapon
            </Link>
            <Link
              href="/inventory/ahemdabad/vehicles"
              className="btn-7 signup-btn-7"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Vehicles
            </Link>
            <Link
              href="/inventory/ahemdabad/communication"
              className="btn-7 signup-btn-7"
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