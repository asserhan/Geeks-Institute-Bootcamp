import random

def check_number(number):
    if(1<= number<=100):
        random_num=random.randint(1,100)
        if(random_num  == number):
            print("You succed!you give the same number we generate")
        else:
            print("You faild! you don't give us the same number we generate")
            print(f"your number:{number} / our random number:{random_num}")
    else:
        print("The number has to be between 1 and 100.Try again")

check_number(5)
            