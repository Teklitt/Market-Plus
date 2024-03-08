Create product table query:

CREATE TABLE `bear_market`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `image` BLOB NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `inventory` INT NOT NULL DEFAULT 0,
   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

 
Add items to the product table:

INSERT INTO product (description, name, price, inventory) VALUES
('High-quality running shoes', 'Running Shoes', 120.00, 50),
('Ergonomic wireless mouse', 'Wireless Mouse', 25.99, 150),
('Organic green tea leaves, 100g', 'Green Tea', 15.75, 200),
('Noise-cancelling over-ear headphones', 'Headphones', 89.99, 75),
('Lightweight camping tent for two people', 'Camping Tent', 199.99, 30),
('Stainless steel water bottle, 1L', 'Water Bottle', 20.00, 120),
('Bluetooth portable speaker', 'Portable Speaker', 45.50, 80),
('Eco-friendly yoga mat', 'Yoga Mat', 35.00, 100),
('Smartphone with 6.5-inch display', 'Smartphone', 999.99, 40),
('Durable backpack for travel', 'Backpack', 70.00, 60),
('LED desk lamp with adjustable brightness', 'Desk Lamp', 23.99, 90),
('Professional hair dryer', 'Hair Dryer', 50.00, 110),
('Compact power bank 10000mAh', 'Power Bank', 19.99, 130),
('32GB USB 3.0 flash drive', 'USB Flash Drive', 12.49, 140),
('Gourmet dark chocolate, 85% cocoa, 100g', 'Dark Chocolate', 7.99, 160);


CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Foreign key referencing the user who owns the cart
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,  -- Foreign key referencing the cart to which the item belongs
    product_id INT NOT NULL,  -- Foreign key referencing the product in the cart
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,  -- Price per unit of the product
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
