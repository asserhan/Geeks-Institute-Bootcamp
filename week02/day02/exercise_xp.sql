--            Exercise 1            --

select * from items ORDER BY price  ASC

select * from items where price >= 80 ORDER BY price DESC

select  first_name, last_name from customers order by first_name ASC LIMIT 3

select last_name from customers order by last_name DESC


--        Exercise2      ---

--1--
SELECT * FROM customer;

--2--
select (first_name,last_name) as full_name from customer;

--3--
SELECT DISTINCT create_date from customer;

--4--
select * from customer ORDER BY first_name DESC;

--5--
select film_id, title, description, release_year, rental_rate
from film order by rental_rate ASC;

--6--
select a.address , a.phone 
from address a
RIGHT OUTER JOIN customer c on  a.address_id = c.address_id 
where a.district = 'Texas';

-----
SELECT a.address, a.phone
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE a.district = 'Texas';

--7--

SELECT * FROM film
WHERE film_id IN (15,150);

--8--
select film_id, title, description, length, rental_rate from film where title='Academy Dinosaur';

--9--

select film_id, title, description, length, rental_rate from film where title like 'Ac%'

--10-- 

SELECT * FROM film 
ORDER BY rental_rate ASC 
LIMIT 10;

--11--

SELECT film_id, title, rental_rate
FROM (
    SELECT film_id, title, rental_rate,
           ROW_NUMBER() OVER (ORDER BY rental_rate ASC) AS rn
    FROM film
) AS ranked
WHERE rn BETWEEN 11 AND 20;

--12--

SELECT c.first_name,c.last_name,p.amount ,p.payment_date
FROM customer c
INNER JOIN 
    payment p ON c.customer_id = p.customer_id
ORDER BY
    c.customer_id

--13-- 

SELECT * FROM film f
LEFT JOIN 
    inventory i ON f.film_id = i.film_id
WHERE i.film_id IS NULL

--14--
SELECT city.city ,country.country
FROM city
JOIN country ON city.country_id=country.country_id
ORDER BY country.country,city.city

--15--

SELECT c.first_name,c.last_name,p.amount ,p.payment_date
FROM customer c
INNER JOIN 
    payment p ON c.customer_id = p.customer_id
INNER JOIN
    staff s ON p.staff_id = s.staff_id
ORDER BY
    s.staff_id