from menu_item import MenuItem
from menu_manager import MenuManager
def show_user_menu():
    try:
        print("Welcme to our program menu")
        while 1:
            print("V: View an Item")
            print("A: Add an Item") 
            print("D: Delete an Item")
            print("U: Update an Item")
            print("S: Show the Menu")
            print("Q Quit")  
            print("Please select an option from the menu above")    
            choices=['V','A','D','U','S','Q']    
            user_input = input("Enter your choice: ").upper()  
            if(user_input.isdigit() or user_input not in choices):
                print("Wrong!Please select an option from the menu above")
                continue
            else:
                if(user_input =='A'):
                    add_item_to_menu()
                if(user_input == 'D'):
                    remove_item_from_menu()
                if(user_input == 'U'):
                    update_item_from_menu()
                if(user_input=='S'):
                    show_restaurant_menu()
                if(user_input=='V'):
                    view_item()
                if(user_input=='Q'):
                    show_restaurant_menu()
                    print("Thank you for using our program")
                    break;

    except (EOFError,KeyboardInterrupt):
        exit(1)

def add_item_to_menu():
    name=input("add the item name: ")
    price=input("add the item price: ")
    item=MenuItem(name,price)
    item.save()
    print("item was added successfully.")

def remove_item_from_menu():
    name = input("Input the name of the item you want to delete from the menu: ")
    item=MenuManager.get_by_name(name) 
    if(item != None):
        item.delete()
        print("The item was deleted successfully")
    else:
        print("Error Can't delete an item does not exist")

def update_item_from_menu():
    name = input("Input the name of the item you want to update: ")
    item=MenuManager.get_by_name(name)
    if(item != None):
        new_name=input("Input the item name you want to update it with: ")
        new_price=input("Input the item price you want to update it with: ")
        item.update(new_name=new_name,new_price=new_price)
        if(MenuManager.get_by_name(new_name) != None):
            print("The item was updated successfully")
        else:
            print("Error")
    else:
        print("This item does not exist in the menu")

def show_restaurant_menu():
    items = MenuManager.all_items()
    if len(items) == 0:
        print("The menu is empty")
    else:
        print("The menu is:")
        for item in items:
            print(f"{item.name} - {item.price}")
        print("End of menu")

def view_item():
    name = input("Input the name of the item you want to view: ")
    item=MenuManager.get_by_name(name)
    if(item != None):
        print(f"{item.name} - {item.price}")
    else:
        print("This item does not exist in the menu")
  
         


if __name__ == "__main__":
    show_user_menu()
    
