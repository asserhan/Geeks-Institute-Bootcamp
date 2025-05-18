import os
import psycopg2
import logging
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import List,Optional
from dotenv import load_dotenv
from contextlib import contextmanager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

DB_CONFIG = {
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT")
}
app = FastAPI(title="FastAPI with PostgreSQL")

@contextmanager
def get_db_connection():
    """Context manager to handle database connection."""
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        yield conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")
    finally:
        if conn:
            conn.close()


class ClientCreate(BaseModel):
    first_name: str
    last_name: str
    
class Customer(ClientCreate):
    id: int


@app.on_event("startup")
async def startup():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT EXISTS (
                        SELECT 1
                        FROM information_schema.tables 
                        WHERE table_name = 'customer'
                    );
                """)
                exists = cursor.fetchone()[0]
                if not exists:
                    cursor.execute("""
                        CREATE TABLE customer (
                            id SERIAL PRIMARY KEY,
                            first_name VARCHAR(50) NOT NULL,
                            last_name VARCHAR(50) NOT NULL
                        );
                    """)
                    conn.commit()
                    logger.info("Customer table created.")
                else:
                    logger.info("Customer table already exists.")
    except Exception as e:
        logger.error(f"Error during startup: {e}")
        raise HTTPException(status_code=500, detail="Error during startup")
    
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI with PostgreSQL!"}

@app.post("/customers/", response_model=Customer)
async def create_customer(user: ClientCreate):

    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    "INSERT INTO customer (first_name, last_name) VALUES (%s, %s) RETURNING id, first_name, last_name;",
                    (user.first_name, user.last_name)
                )
                new_customer = cursor.fetchone()
                conn.commit()
                logger.info(f"Customer created: {new_customer}")
                return dict(new_customer)
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error creating customer: {e}")
        raise HTTPException(status_code=500, detail="Error creating customer")
    
@app.get("/customers/", response_model=List[Customer])
def get_customers():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM customer;")
                customers = cursor.fetchall()
                logger.info(f"Retrieved customers: {customers}")
                return [dict(customer) for customer in customers]
    except Exception as e:
        logger.error(f"Error retrieving customers: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving customers")
    

@app.get("/customers/{customer_id}", response_model=Customer)
def get_customer(customer_id: int):

    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM customer WHERE id = %s;", (customer_id,))
                customer = cursor.fetchone()
                if not customer:
                    logger.warning(f"Customer with ID {customer_id} not found.")
                    raise HTTPException(status_code=404, detail="Customer not found")
                logger.info(f"Retrieved customer: {customer}")
                return dict(customer)
    except Exception as e:
        logger.error(f"Error retrieving customer: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving customer")
    
@app.put("/customers/{customer_id}", response_model=Customer)
def update_customer(customer_id: int, user: ClientCreate):

    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    "UPDATE customer SET first_name = %s, last_name = %s WHERE id = %s RETURNING id, first_name, last_name;",
                    (user.first_name, user.last_name, customer_id)
                )
                updated_customer = cursor.fetchone()
                if not updated_customer:
                    logger.warning(f"Customer with ID {customer_id} not found.")
                    raise HTTPException(status_code=404, detail="Customer not found")
                conn.commit()
                logger.info(f"Customer updated: {updated_customer}")
                return dict(updated_customer)
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error updating customer: {e}")
        raise HTTPException(status_code=500, detail="Error updating customer")
    
@app.delete("/customers/{customer_id}", response_model=Customer)
def delete_customer(customer_id: int):

    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("DELETE FROM customer WHERE id = %s RETURNING id, first_name, last_name;", (customer_id,))
                deleted_customer = cursor.fetchone()
                if not deleted_customer:
                    logger.warning(f"Customer with ID {customer_id} not found.")
                    raise HTTPException(status_code=404, detail="Customer not found")
                conn.commit()
                logger.info(f"Customer deleted: {deleted_customer}")
                return dict(deleted_customer)
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error deleting customer: {e}")
        raise HTTPException(status_code=500, detail="Error deleting customer")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000, reload=True)
# To run the application, use the command:
# uvicorn challenge:app --host localhost --port 8000 --reload
# To test the application, you can use tools like Postman or curl to send requests to the endpoints.
# Example requests:
# 1. Create a new customer:
#    POST http://localhost:8000/customers/
#    Body: {"first_name": "John", "last_name": "Doe"}
# 2. Get all customers:
#    GET http://localhost:8000/customers/
# 3. Get a customer by ID:      
#    GET http://localhost:8000/customers/1
# 4. Update a customer by ID:
#    PUT http://localhost:8000/customers/1
#    Body: {"first_name": "Jane", "last_name": "Doe"}
# 5. Delete a customer by ID:
#    DELETE http://localhost:8000/customers/1
# Note: Make sure to have PostgreSQL running and the database credentials set in the .env file.




