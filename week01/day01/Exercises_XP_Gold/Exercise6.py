import random
# random.seed()
won=0
lose=0
try:
    while 1:
        random_num=random.randrange(0,10)
        try:
            number=int(input("Input a number from 1 to 9: "))
            if(number==random_num):
                print("Winner")
                won+=1
            else:
                print("Better luck next time")
                lose+=1
        except ValueError:
            continue
except (EOFError,KeyboardInterrupt):
    print("\nyou finish the game")

print(f"You win {won} times and lose {lose} times")