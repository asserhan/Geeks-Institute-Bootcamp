--            Exercise 1            --

select * from items ORDER BY price  ASC

select * from items where price >= 80 ORDER BY price DESC

select  first_name, last_name from customers order by first_name ASC LIMIT 3

select last_name from customers order by last_name DESC


--        Exercise2      ---

SELECT * FROM customer

select (first_name,last_name) as full_name from customer 

SELECT DISTINCT create_date from customer 

select * from customer ORDER BY first_name DESC

select film_id, title, description, release_year, rental_rate from film order by rental_rate ASC 