names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

name=input("What is your name:\n")
for i in range(len(names)):
    if(name.capitalize() == names[i]):
        print(i)
        break