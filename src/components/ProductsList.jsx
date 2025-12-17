import { useState, useEffect } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateProduct = async (product) => {
    const newTitle = prompt("New title:", product.title);
    const newPrice = prompt("New price:", product.price);

    if (!newTitle || !newPrice) return;

    await fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        price: parseFloat(newPrice),
      }),
    });

    loadProducts(); // refresh list
  };

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}{" "}
            <button onClick={() => updateProduct(p)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;