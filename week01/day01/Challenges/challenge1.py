
try:
    number=int(input("Input a number: "))
    length=int(input("Input a length: "))
    for i in range(1,length + 1):
        print(i*number)
except (KeyboardInterrupt,EOFError):
    exit(1)
