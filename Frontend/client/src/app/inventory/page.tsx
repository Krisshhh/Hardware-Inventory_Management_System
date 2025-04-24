"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "/Users/princepatel/Downloads/inventory-management-master/client/src/app/inventory/incentory.css"

const Homepage = () => {
  return (
    <div className="main-container">
      <main className="content-container">
        <h1 className="headline">Inventory Management</h1>

        <div className="button-container">
          <>
            <Link href="/inventory/bhopal" className="btn login-btn">
              Bhopal
            </Link>
            <Link
              href="/inventory/ahemdabad"
              className="btn signup-btn"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Ahmedabad
            </Link>
          </>
        </div>
      </main>
    </div>
  );
};

export default Homepage;