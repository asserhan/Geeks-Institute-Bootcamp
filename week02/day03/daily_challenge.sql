-----Part 1 -----

---1---

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT REFERENCES Customer (id) ON DELETE CASCADE
    
);

-----2-----


INSERT INTO customer (first_name,last_name) VALUES
('John','Doe'),
('Jerome','Lalu'),
('Lea','Rive');

select * from customer;

-----3-----

INSERT INTO customer_profile(isLoggedIn,customer_id) VALUES
(True,1),
(False,2);

select * from customer_profile;


-----4-----

select c.first_name,cp.isLoggedIn
from  customer c
inner join customer_profile cp on c.id=cp.customer_id;

select c.first_name,cp.isLoggedIn
from  customer c
LEFT JOIN customer_profile cp on c.id=cp.customer_id;

select COUNT(*)
from customer_profile
where isLoggedIn=FALSE;



-------Part 2-------


---1---
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);
---2---
INSERT INTO Book (title,author) VALUES
('Alice In Wonderland','Lewis Carroll'),
('Harry Potter','J.K Rowling'),
('To kill a mockingbird','Harper Lee');
----3----

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100)  NOT NULL UNIQUE,
    age INT NOT NULL CHECK (age < 15)
);

------4-----

INSERT INTO Student (name,age) VALUES
('John',12),
('Lera',11),
('Patrick',10),
('Bob',14);
SELECT * FROM student;

---5----


CREATE TABLE Library (
    book_fk_id INT REFERENCES Book (book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES Student (student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date TIMESTAMP ,
    PRIMARY KEY (book_fk_id, student_fk_id)
);


-------6---

-----the student named John, borrowed the book Alice In Wonderland on the 15/02/2022
-- the student named Bob, borrowed the book To kill a mockingbird on the 03/03/2021
-- the student named Lera, borrowed the book Alice In Wonderland on the 23/05/2021
-- the student named Bob, borrowed the book Harry Potter the on 12/08/2021

INSERT INTO Library (book_fk_id,student_fk_id,borrowed_date) VALUES
(1,1,'2022-02-15'),
(3,4,'2021-03-03'),
(1,3,'2021-05-23'),
(2,4,'2021-08-12');

------7----

SELECT * FROM Library;

SELECT s.name,b.title 
FROM student s
JOIN library l ON l.student_fk_id=s.student_id
JOIN book b ON b.book_id = l.book_fk_id;


SELECT AVG(s.age) AS average_age
FROM student s
JOIN library l ON l.student_fk_id = s.student_id
JOIN book b ON b.book_id = l.book_fk_id
WHERE b.title = 'Alice In Wonderland';

DELETE FROM student
WHERE student_id = 1;

SELECT * FROM student;
SELECT * FROM library;
--- WHEN I deletw the student John, the library table is also deleted this row 
-- because of the ON DELETE CASCADE constraint on the foreign key
