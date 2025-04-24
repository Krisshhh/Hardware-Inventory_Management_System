"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "/Users/princepatel/Downloads/inventory-management-master/client/src/app/inventory/ahemdabad/communication/comm.css";
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

function WeaponInventory() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3023/api/auth/products"
        );
        setWeapons(response.data);
        setIsLoading(false);
      } catch (err: any) {
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
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#ffb74d", "#e57373"],
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="main-container-10">
      {/* Navbar */}
      <nav className="navbar-10">
        <div className="navbar-logo-10">
          <span>Police Communication Devices Inventory</span>
        </div>
      </nav>

      <div className="content-container-10">
        {/* <h1 className="text-xl font-bold mt-5 mb-3">Weapon Inventory</h1> */}

        {/* Weapons Table */}
        <table className="weapon-table-10">
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
                <td>{`$${weapon.price}`}</td>
                <td>{weapon.rating || "N/A"}</td>
                <td>{weapon.quantity}</td>
                <td>{weapon.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pie Charts */}
        <div className="charts-container-10">
          <div className="chart-10">
            <h2>Status Distribution</h2>
            <Pie data={statusData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-10">
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
}

export default WeaponInventory;