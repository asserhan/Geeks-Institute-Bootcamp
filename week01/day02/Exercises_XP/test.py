family = {}
done = 0

try:
    while True:
        try:
            size = int(input("How many members in your family? "))
            if size < 1:
                print("Please enter a positive number.")
                continue
            break
        except ValueError:
            print("Please enter a valid number.")
    
    remaining = size
    while remaining > 0:
        try:
            name = input(f"Input the name of member {size-remaining+1}: ")
            if not name.strip():
                print("Name cannot be empty. Try again.")
                continue
                
            try:
                age = int(input(f"Input the age of {name}: "))
                if age < 0 or age > 150:
                    print("Please enter a valid age between 0 and 150.")
                    continue
                    
                family[name] = age
                remaining -= 1
                
            except ValueError:
                print("Age must be a number. Please try again.")
                
        except (EOFError, KeyboardInterrupt):
            print("\nInput interrupted. Exiting program.")
            exit(1)
    
    done = 1
    
except (EOFError, KeyboardInterrupt):
    print("\nInput interrupted. Exiting program.")
    exit(1)

if done == 1:
    print("\nYour family members:")
    for key, value in family.items():  # Fixed: .items is a method, not an attribute
        print(f"{key} -> {value}")