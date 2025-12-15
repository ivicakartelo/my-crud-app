import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL user
  password: "",       // your MySQL password
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

app.post("/api/products", (req, res) => {
  const { title, description, price } = req.body;

  // Validate required fields
  if (!title || !price) {
    return res.status(400).json({ error: "Title and price are required" });
  }

  const sql = "INSERT INTO products (title, description, price) VALUES (?, ?, ?)";

  db.query(sql, [title, description || "", parseFloat(price)], (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Product created", id: result.insertId });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});