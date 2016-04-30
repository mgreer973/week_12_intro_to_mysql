CREATE DATABASE bamazon;

CREATE TABLE bamazon.products
(item_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(11,2) NOT NULL,
stock_quanity INT UNSIGNED NOT NULL,
PRIMARY KEY (item_id));

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Baseball', 'Sports',9.99, 89 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Football', 'Sports',19.99, 189 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Coat', 'Apparel',89.99, 52 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Shirt', 'Apparel',29.99, 149 );

INSERT INTO bamazon.products (product_name, department_name, price, stock_quanity) VALUES ('fm radio', 'Electronics',24.99, 23 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Dishes', 'Kitchen',235.45, 79 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Forks', 'Kitchen',3.99, 329 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Spoons', 'Kitchen',1.99, 289 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('Steak Knives', 'Kitchen',19.99, 189 );

INSERT INTO bamazon.products 	(product_name, department_name, price, stock_quanity) VALUES 	('55 in. LCD Television', 'Electronics',499.99, 55 );

