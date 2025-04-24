"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css"; // Adjust the path as needed
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Weapon {
  id: number;
  name: string;
  price: number;
  rating: string;
  quantity: number;
  condition: string;
}

const WeaponInventory = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7543/api/auth/products"
        );
        console.log(response.data);
        setWeapons(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch weapons data");
        setIsLoading(false);
      }
    };

    fetchWeapons();
  }, []);

  // Aggregate data for charts
  const statusCounts = weapons.reduce((acc: Record<string, number>, weapon) => {
    acc[weapon.condition] = (acc[weapon.condition] || 0) + 1;
    return acc;
  }, {});

  const stockCounts = weapons.reduce((acc: Record<string, number>, weapon) => {
    if (weapon.quantity > 100) {
      acc["In Stock"] = (acc["In Stock"] || 0) + 1;
    } else {
      acc["Low Stock"] = (acc["Low Stock"] || 0) + 1;
    }
    return acc;
  }, {});

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#3b82f6", "#a855f7", "#ef4444", "#10b981", "#f59e0b"],
        hoverBackgroundColor: ["#60a5fa", "#c084fc", "#f87171", "#34d399", "#fbbf24"],
      },
    ],
  };

  const stockData = {
    labels: Object.keys(stockCounts),
    datasets: [
      {
        data: Object.values(stockCounts),
        backgroundColor: ["#2196f3", "#fbc02d"],
        hoverBackgroundColor: ["#64b5f6", "#ffeb3b"],
      },
    ],
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span>Police Devices Inventory</span>
        </div>
      </nav>

      <div className="content-container">
        {/* Weapons Table */}
        <table className="weapon-table">
          <thead>
            <tr>
              <th>Weapon Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((weapon) => (
              <tr key={weapon.id}>
                <td>{weapon.name}</td>
                <td>{`$${weapon.price.toFixed(2)}`}</td>
                <td>{weapon.rating || "N/A"}</td>
                <td>{weapon.quantity}</td>
                <td>{weapon.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pie Charts */}
        <div className="charts-container">
          <div className="chart">
            <h2>Status Distribution</h2>
            <Pie data={statusData} />
          </div>
          <div className="chart">
            <h2>Stock Distribution</h2>
            <Pie data={stockData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Police Inventory Management. All rights reserved.</p>
        <p>
          Contact us:{" "}
          <a href="mailto:support@policeinventory.com">
            support@policeinventory.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WeaponInventory;