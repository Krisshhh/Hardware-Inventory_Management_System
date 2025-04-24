"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import "./form.css";

// Define a TypeScript interface for the form data
interface FormData {
  category: string;
  name: string;
  price: string;
  quantity: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    name: "",
    price: "",
    quantity: "",
  });

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.category ||
      !formData.name ||
      !formData.price ||
      !formData.quantity
    ) {
      setError("All fields are required.");
      return;
    }

    const price = parseFloat(formData.price);
    const quantity = parseInt(formData.quantity, 10);

    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      setError("Quantity must be a positive integer.");
      return;
    }

    setError(""); // Clear any previous error

    try {
      const response = await axios.post(
        "http://localhost:1234/api/auth/product", // Replace with your actual API URL
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccessMessage("Product added successfully.");
        setFormData({
          category: "",
          name: "",
          price: "",
          quantity: "",
        });
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (err: any) {
      console.error("API error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Automatically clear success messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="form-container-12">
      <div className="hellooo">
      <h1>Add New Product to Inventory</h1>
      </div>
      {/* Display error or success messages */}
      {error && <div className="form-error-message-12">{error}</div>}
      {successMessage && <div className="form-success-message-12">{successMessage}</div>}

      <form className="form-12" onSubmit={handleSubmit}>
        <div className="form-group-12">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-12">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-12">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="1"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-12">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button-12">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;