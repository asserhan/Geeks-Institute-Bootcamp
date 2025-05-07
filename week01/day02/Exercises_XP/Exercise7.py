import random

def get_random_temp():
    return random.randrange(-10,40)


def main():
    temp=get_random_temp()
    print(f"The temperature right now is {temp} degrees Celsius.")
    if(temp<0):
        print("“Brrr, that’s freezing! Wear some extra layers today")
    elif (0<=temp<=16 ):
        print("Quite chilly! Don’t forget your coat")
    elif (16<temp<=23):
        print("Pleasant and mild today. A light jacket might be needed in the shade or evening.")
    elif (24<=temp<=32 ):
        print("Warm and comfortable weather. Perfect for outdoor activities, but stay hydrated.")
    elif (32<temp<=40 ):
        print("Hot temperatures today! Keep cool, seek shade, and remember your sunscreen and water bottle.")



if __name__ == '__main__':
    main()