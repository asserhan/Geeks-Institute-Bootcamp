# family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
# price=0
# somme=0
# for key,value in family.items():
#     if(value < 3):
#         price = 0
#     elif 3<= value <= 12:
#         price=10
#     else:
#         price=15
#     print("{name} has to pay {ticket}$".format(name=key,ticket=price))
#     somme += price
# print("The total price is: {total}$".format(total=somme))

#bonus
family={}
done=0
try:
    while 1:
        try:
            size=int(input("How many member in your family? "))
            if(size < 1):
                print("Please enter a positive number")
                continue
            break
        except ValueError:
            print("Please enter number")
    while size:
        try:
            name=input("Input the name of the member: ")
            if not name.strip():
                print("name can not be empty")
                continue
            if name.strip().isdigit():
                print("name has to be string")
                continue
            try:
                age=int(input("Input the age of the member: "))
                if(age < 0):
                    print("Please enter a valid age")
                    continue
                
                family[name]=age
                size-=1
            except ValueError:
                print("Age must be a valid number. Please try agin")
      
        except (EOFError,KeyboardInterrupt):
            exit(1)

    done=1

except (EOFError,KeyboardInterrupt):
    exit(1)

if done ==1:  
    print("you family members are: ")
    for key,value in family.items():
        print("{fname} has {fage} years old".format(fname=key,fage=value))