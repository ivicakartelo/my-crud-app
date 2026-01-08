import { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from server
  const loadProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My E-shop App</h1>
      <ProductForm setProducts={setProducts} products={products} />
      <ProductsList products={products} setProducts={setProducts} />
    </div>
  );
}