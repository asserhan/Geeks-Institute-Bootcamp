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
