i=1
numbers=[]
while i <= 3:
    try:
        number=int(input(f"Input the {i}st number: "))
        numbers.append(number)
        i+=1
    except KeyboardInterrupt:
        exit(1)
    except EOFError:
        exit(1)

print(f"The greatest number is: {max(numbers)}")