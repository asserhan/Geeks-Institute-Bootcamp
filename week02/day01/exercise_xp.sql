createdb public

CREATE TABLE items();
CREATE TABLE customers();

ALTER TABLE items 
ADD COLUMN id SERIAL,
ADD COLUMN name VARCHAR(50) NOT NULL,
ADD COLUMN price NUMERIC(10, 2) NOT NULL;

INSERT INTO items (name, price) VALUES
  ('Small Desk', 100),
  ('Large Desk', 300),
  ('Fan', 80);

ALTER TABLE customers
ADD COLUMN id SERIAL,
ADD COLUMN first_name VARCHAR(50) NOT NULL,
ADD COLUMN last_name VARCHAR(50) NOT NULL,

INSERT INTO customers (first_name, last_name) VALUES
  ('Greg','Jones'), 
  ('Sandra','Jones'),
  ('Scott', 'Scott'),
  ('Trevor' ,'Green'),
  ('Melanie' ,'Johnson');

SELECT * FROM items;

SELECT * FROM items WHERE price > 80;
SELECT * FROM items WHERE price <= 300;

-- the query below will return no rows
SELECT * FROM customers WHERE last_name='Smith'; 

SELECT * FROM customers WHERE last_name='Jones'; 

SELECT * FROM customers WHERE first_name != 'Scott';



