CREATE DATABASE IF NOT EXISTS actpha11;
USE actpha11;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Pain Relief', 'Pain relief medications and anti-inflammatory drugs'),
('Antibiotics', 'Various types of antibiotics'),
('Vitamins', 'Vitamins and supplements'),
('First Aid', 'First aid supplies and medications');

-- Insert sample medications
INSERT INTO medications (name, description, category_id, price, stock, image_url) VALUES
('Ibuprofen 200mg', 'Pain relief and anti-inflammatory medication', 1, 9.99, 100, 'https://example.com/ibuprofen.jpg'),
('Amoxicillin 500mg', 'Broad-spectrum antibiotic', 2, 15.99, 50, 'https://example.com/amoxicillin.jpg'),
('Vitamin D3 1000IU', 'Daily vitamin D supplement', 3, 12.99, 200, 'https://example.com/vitamind.jpg'),
('Bandage Kit', 'Sterile bandages and gauze', 4, 7.99, 150, 'https://example.com/bandage.jpg'); 