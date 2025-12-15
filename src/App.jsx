import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>My E-commerce App</h1>

      <ProductForm onProductCreated={loadProducts} />

      <ProductsList products={products} />
    </div>
  );
}