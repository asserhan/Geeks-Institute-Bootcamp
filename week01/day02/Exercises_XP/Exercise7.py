import random

def get_random_temp(season):
    if season=="winter":
        return random.randrange(-10,16)
    elif season=="autum":
        return random.randrange(17,20)
    elif season=="spring":
        return random.randrange(21,29)
    elif season=="summer":
        return random.randrange(30,40)
        
        
    


def main():
    try:
        seasons=["summer","winter","spring","autum"]
        season=input("Input a season: ").strip().lower()
        if season in seasons:
            temp=get_random_temp(season)
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
        else:
            print("wrong season")
    except (EOFError,KeyboardInterrupt):
        exit(1)



if __name__ == '__main__':
    main()