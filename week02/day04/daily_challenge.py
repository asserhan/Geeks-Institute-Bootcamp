import requests
import random
import psycopg2


DB_NAME = "countries_db"
USER = "postgres"
PASSWORD = "12345"
HOST = "localhost"
PORT = "5432"

def create_table(cursor, connection):
    query = '''
    CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        capital TEXT,
        flag TEXT,
        subregion TEXT,
        population BIGINT
    );
    '''
    cursor.execute(query)
    connection.commit()

def insert_country(cursor, connection, country_data):
    query = '''
    INSERT INTO countries (name, capital, flag, subregion, population)
    VALUES (%s, %s, %s, %s, %s);
    '''
    cursor.execute(query, country_data)
    connection.commit()

def fetch_10_random_countries():
    response = requests.get("https://restcountries.com/v3.1/all")
    all_countries = response.json()
    return random.sample(all_countries, 10)

def transform_country_data(country):
    name = country.get("name", {}).get("common", "Unknown")
    capital = country.get("capital", ["Unknown"])[0]
    flag = country.get("flags", {}).get("png", "")
    subregion = country.get("subregion", "Unknown")
    population = country.get("population", 0)
    return (name, capital, flag, subregion, population)

if __name__ == "__main__":
    try:
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT
        )
        cursor = connection.cursor()

        create_table(cursor, connection)

        print("Fetching countries from API...")
        countries = fetch_10_random_countries()

        for country in countries:
            data = transform_country_data(country)
            insert_country(cursor, connection, data)

        print("10 countries inserted successfully.")

        cursor.execute("SELECT * FROM countries;")
        for row in cursor.fetchall():
            print(row)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
