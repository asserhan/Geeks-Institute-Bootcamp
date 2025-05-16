import sqlite3

class MenuItem():
    def __init__(self,name,price):
        self.name=name
        self.price=price

    def save(self):
        conn = sqlite3.connect('restaurant.db')
        cursor=conn.cursor()
        cursor.execute("INSERT INTO Menu_Items (item_name,item_price) VALUES (?,?)",(self.name,self.price))
        conn.commit()
        # results=cursor.fetchall()
        conn.close()
     
    def delete(self):
        conn=sqlite3.connect('restaurant.db')
        cursor=conn.cursor()
        cursor.execute("DELETE FROM Menu_Items WHERE item_name = ?",(self.name,))
        conn.commit()

    def update(self,new_name,new_price):
        conn=sqlite3.connect('restaurant.db')
        cursor=conn.cursor()
        cursor.execute("UPDATE Menu_Items SET item_name = ? ,item_price = ? WHERE item_name = ?",(new_name,new_price,self.name))
        conn.commit()
        self.name=new_name
        self.price = new_price


