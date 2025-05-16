from menu_item import MenuItem
from menu_manager import MenuManager
def show_user_menu():
    try:
        while 1:
            print("Welcme to our program menu")
            print("V: View an Item")
            print("A: Add an Item") 
            print("D: Delete an Item")
            print("U: Update an Item")
            print("S: Show the Menu")
            print("Q: Quit")    
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
                break
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


if __name__ == "__main__":
    show_user_menu()
    
