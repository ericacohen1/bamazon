-- DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple watch", "electronics", 350, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nike free", "shoes", 110, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("adidas ultraboots", "shoes", 180, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("amazon echo", "electronics", 100, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("uggs", "shoes", 175, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronis", 250, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lululemon yoga pants", "clothing", 100, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lululemon jacket", "clothing", 170, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("food processor", "appliances", 30, 78);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "appliances", 100, 230);

SELECT * FROM products;