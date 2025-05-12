from game import Game

def get_user_menu_choice():
        print("Menu:\n")
        print("(g) Play a new game\n")
        print("(x) Show scores and exit\n")
        choices=['g','x']
        item=input()
        if item not in choices:
            print("Invalid choice, please try again.")
            return None
        return item
def print_results(results):
    print("Game Results:")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")

def main():
    try:
        dict={'win':0,'loss':0,'draw':0}
        while(1):
            choice=None
            while choice is None:
                choice=get_user_menu_choice()
            if(choice=='x'):
                print_results(dict)
                print("Thank you for playing")
                break
            elif(choice=='g'):
                print("Starting a new game...")
                game = Game()
                resuls=game.play()
                for key in resuls:
                    dict[key] += resuls.get(key,0)
    except (EOFError,KeyboardInterrupt):
        exit(1)
     

if __name__=="__main__":
       main()
