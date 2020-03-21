DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "toilet paper, 30 rolls", "household goods", 18.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "bottled water, 32 bottles", "household goods", 7.25, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "liquid handsoap, 64 oz.", "household goods", 5.75, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "shampoo, 30 oz.", "household goods", 4.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "toothpaste, 6 pack", "household goods", 7.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "bleach, 1 gal.", "household goods", 3.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "vinegar, 1 L", "household goods", 5.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "rice, 25 lbs.", "household goods", 9.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "flour, 25 lbs.", "household goods", 6.99, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "oil, 1 gal.", "household goods", 17.85, 99);

-- List all the rows of ALL columns, * is a wildcard denoting all columns
SELECT item_id FROM products 
  
