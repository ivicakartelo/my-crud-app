-- 1. Create database
CREATE DATABASE IF NOT EXISTS crud;
USE crud;

-- 2. Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert sample data
INSERT INTO products (title, description, price)
VALUES
('Laptop Basic', 'Entry-level laptop for everyday tasks.', 499.99),
('Smartphone X', 'High-performance smartphone with 128GB storage.', 799.00),
('Bluetooth Headphones', 'Wireless headphones with noise reduction.', 129.50),
('Gaming Keyboard', 'Mechanical keyboard with RGB lighting.', 69.90),
('Office Chair', 'Ergonomic chair suitable for long work sessions.', 149.00);
