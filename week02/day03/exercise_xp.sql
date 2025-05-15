------Exercise 1 ------

----1---
select name from language;

---2----

select f.title,f.description,l.name
from film f
join language l ON f.language_id = l.language_id;

---3-----

select l.name,f.title,f.description
from language l
LEFT JOIN film f ON f.language_id = l.language_id;

---4----

CREATE TABLE new_film (
    id INT  PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (id, name) VALUES 
(1, 'Dune: Part Two'),
(2, 'Oppenheimer'),
(3, 'Everything Everywhere All at Once'),
(4, 'The Batman'),
(5, 'Killers of the Flower Moon'),
(6, 'Poor Things'),
(7, 'Past Lives'),
(8, 'Inside Out 2'),
(9, 'The Holdovers'),
(10, 'Portrait of a Lady on Fire');

SELECT * FROM new_film;

--5---

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY NOT NULL,
    film_id INTEGER REFERENCES new_film (id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language (language_id),
    title VARCHAR(255) NOT NULL,
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP 
);
SELECT language_id, name FROM language;

----6----
INSERT INTO customer_review (film_id, language_id, title, score, review_text, last_update) VALUES 
(1, 1, 'Amazing Movie', 9, 'I loved this movie!', '2023-10-01 12:00:00'),
(2, 1, 'Great Film', 8, 'A must-watch for everyone.', '2023-10-02 14:30:00')

select * from customer_review;

----7----

DELETE FROM new_film
WHERE id = 1;

-- THE review also deleted because of the ON DELETE CASCADE
SELECT * FROM customer_review;



---------- Exercise 2 -----------

---1---

UPDATE language
SET name = 'Korean'
WHERE name = 'Japanese';

---2---

--Foreign keys in customer reference other tables are address_id and store_id,
--SO When inserting data into the customer table, must ensure that the values for foreign key columns (address_id, store_id) already exist in their referenced tables.
--OR we can insert data into the referenced tables first and then into the customer table.

---3---

--This delete does not need checking because customer_review table is the child table 
DROP TABLE customer_review;

---4---

SELECT COUNT(rental_id) FROM rental
WHERE return_date IS NULL
--Number of renatals are not returned yet are 183 

--5---

SELECT f.title, f.rental_rate
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

---6---

--1ST FILM-- 


select f.title
from film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe';

---2ND FILM--
--The 2nd film : A short documentary (less than 1 hour long), rated “R”.

select f.title,f.rating,f.rental_duration
from film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Documentary' AND f.rental_duration < 60 AND f.rating = 'R';

--3RD FILM--

select distinct f.title
from film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON c.customer_id = p.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';


--4TH FILM--

---The 4th film : His friend Matthew Mahan watched this film, as well. It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.

select f.title,f.description,f.replacement_cost
from film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON c.customer_id = p.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND f.replacement_cost > 20.00
AND (f.title LIKE '%boat%' OR f.description LIKE '%boat%');





--5TH FILM--





