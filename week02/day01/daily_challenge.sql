-- count how many actors in the table 

SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name) VALUES
  ('John', 'Doe'),
  ('Jane', 'Smith');

/*
ERROR:  null value in column "age" of relation "actors" violates not-null constraint
DETAIL:  Failing row contains (6, John, Doe, null, null).
Trying to insert a new actor with blank or missing fields 
will result in an error because of the NOT NULL constraints.
*/
