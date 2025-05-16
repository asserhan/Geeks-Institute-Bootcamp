from  menu_item import MenuItem
import sqlite3

class MenuManager(MenuItem):
    def __init__(self, name, price):
        super().__init__(name, price)
    @classmethod
    def get_by_name(cls,sname):
        conn=sqlite3.connect('restaurant.db')
        cursor=conn.cursor()
        cursor.execute("SELECT item_name,item_price FROM Menu_Items WHERE item_name = ?",(sname,))
        row = cursor.fetchone()
        conn.close()
        if row:
            item_name,item_price = row
            return MenuItem(item_name,item_price)
        else:
            return None
    @classmethod
    def all_items(cls):
        conn = sqlite3.connect('restaurant.db')
        cursor = conn.cursor()
        cursor.execute("SELECT item_name, item_price FROM Menu_Items")
        rows = cursor.fetchall()
        conn.close()

        items = []
        for name, price in rows:
            items.append(MenuItem(name, price))
        return items
    
if __name__ == "__main__":


    item = MenuItem('Burger', 35)
    item.save()
    item.update('Veggie Burger', 37)
    item2 = MenuManager.get_by_name('Veggie Burger')
    if item2:
        print(item2.name, item2.price)
    else:
        print("Item not found")
    item.delete()
    item = MenuItem('Burger', 35)
    item.save()
    item= MenuItem('Pizza', 50)
    item.save()
    items2 = MenuManager.all_items()
    for item in items2:
        print(item.name, item.price)
    item.delete()


