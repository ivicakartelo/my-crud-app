import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

// GET all products
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE product (no validation)
app.post("/api/products", (req, res) => {
  const { title, description, price } = req.body;

  const sql =
    "INSERT INTO products (title, description, price) VALUES (?, ?, ?)";

  db.query(sql, [title, description, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product created", id: result.insertId });
  });
});

// UPDATE product (no validation)
app.put("/api/products/:id", (req, res) => {
  const { title, price } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE products SET title = ?, price = ? WHERE id = ?";

  db.query(sql, [title, price, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated" });
  });
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.idv],
    () => res.sendStatus(204)
  );
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});