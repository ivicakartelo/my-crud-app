import React, { useState, useEffect } from "react";

const ProductsList = () => {
  // Mock data for now
  const [products, setProducts] = useState([
    { id: 1, title: "Laptop Basic", price: 499.99, created_at: "2025-12-10 12:00:00" },
    { id: 2, title: "Smartphone X", price: 799.0, created_at: "2025-12-10 12:10:00" },
    { id: 3, title: "Bluetooth Headphones", price: 129.5, created_at: "2025-12-10 12:20:00" },
    { id: 4, title: "Gaming Keyboard", price: 69.9, created_at: "2025-12-10 12:30:00" },
    { id: 5, title: "Office Chair", price: 149.0, created_at: "2025-12-10 12:40:00" },
  ]);

  return (
    <div>
      <h2>Products List</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.created_at}</td>
              <td>
                <button>Edit</button> <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;