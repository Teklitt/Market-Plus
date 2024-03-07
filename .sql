Create product table query:

CREATE TABLE `bear_market`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` BLOB NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `inventory` INT NOT NULL,
  PRIMARY KEY (`id`));

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

