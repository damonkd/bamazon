DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
  );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Slim Jim', 'Snacks', '1.25', '30');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Tylenol', 'Medicine', '3.59', '7');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Kilt Lifter', 'Beer', '8.75', '12');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Dr Pepper', 'Soft Drink', '2.99', '4');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Deck of Cards', 'Games', '1.15', '15');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Thumb Drive', 'Computer Accesories', '12.25', '16');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Dry Ice', 'Chemicals', '5.55', '2');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Hitch Hikers Guide to the Galaxy', 'Books', '13.99', '42');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Toothpaste', 'Oral Hygene', '3.25', '5');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( 'Guitar', 'Musical Instruments', '250.55', '3');

SELECT * FROM products;