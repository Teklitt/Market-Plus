Create product table query:

DROP SCHEMA IF EXISTS bear_market;
CREATE SCHEMA bear_market;
USE bear_market;

CREATE TABLE user (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  status VARCHAR(10) DEFAULT NULL,
  role_id SMALLINT UNSIGNED NULL,
  branch_id SMALLINT UNSIGNED NULL,
);

--- Table structure for `products`
CREATE TABLE product (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  inventory SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--- Table structure for `category`
CREATE TABLE category (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(10) DEFAULT NULL,
  image TEXT DEFAULT NULL,
);

--- Table structure for `carts`
CREATE TABLE carts (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id SMALLINT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


--- Table structure for `cart_items`
CREATE TABLE cart_items (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cart_id SMALLINT UNSIGNED NOT NULL,
  product_id SMALLINT UNSIGNED NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

--- Insert into tables below
INSERT INTO user VALUES ('John', 'Doe', 'password', '1234567890', 'john.doe@gmail.com', NULL, NULL, NULL),
('Jane', 'Smith', 'password', '0987654321', 'jane.smith@outlook.com', NULL, NULL, NULL)

INSERT INTO product VALUES ('https://res.cloudinary.com/djksz5job/image/upload/v1710031150/running%20shoes.webp', 'High-quality running shoes', 'Running Shoes', 120.00, 50),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031191/wireless%20mouse.webp', 'Ergonomic wireless mouse', 'Wireless Mouse', 25.99, 150),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031519/green%20tea.jpg', 'Organic green tea leaves, 100g', 'Green Tea', 15.75, 200),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031539/headphones.jpg', 'Noise-cancelling over-ear headphones', 'Headphones', 89.99, 75),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031539/camping%20tent.jpg', 'Lightweight camping tent for two people', 'Camping Tent', 199.99, 30),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031539/camping%20tent.jpg', 'Stainless steel water bottle, 1L', 'Water Bottle', 20.00, 120),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031539/portable%20speaker.jpg', 'Bluetooth portable speaker', 'Portable Speaker', 45.50, 80),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031539/yoga%20mat.jpg', 'Eco-friendly yoga mat', 'Yoga Mat', 35.00, 100),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031555/smartphone.jpg', 'Smartphone with 6.5-inch display', 'Smartphone', 999.99, 40),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031555/backpack.jpg', 'Durable backpack for travel', 'Backpack', 70.00, 60),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031554/desk%20lamp.jpg', 'LED desk lamp with adjustable brightness', 'Desk Lamp', 23.99, 90),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031554/hair%20dryer.webp', 'Professional hair dryer', 'Hair Dryer', 50.00, 110),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031554/portable%20charger.webp', 'Compact power bank 10000mAh', 'Power Bank', 19.99, 130),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031554/usb%20flash%20drive.webp', '32GB USB 3.0 flash drive', 'USB Flash Drive', 12.49, 140),
('https://res.cloudinary.com/djksz5job/image/upload/v1710031554/dark%20chocolate.jpg', 'Gourmet dark chocolate, 85% cocoa, 100g', 'Dark Chocolate', 7.99, 160);

INSERT INTO category VALUES ('Student Life', 'Electronic gadgets and accessories', 'active', NULL),
('Electronics', 'Electronic gadgets and accessories', 'active', NULL),
('Food', 'Gourmet food items', 'active', NULL),
('Clothing', 'Fashionable', 'active', NULL),
('Services', 'Professional services', 'active', NULL),
('Holiday Gifts', 'Gift ideas for the holiday season', 'active', NULL);


