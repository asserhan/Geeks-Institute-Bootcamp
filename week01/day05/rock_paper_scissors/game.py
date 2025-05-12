import random

class Game():
    def __init__(self):
        pass
    def get_user_item(self):
        
            while(1):
                item=input("Select (r)ock, (p)aper, or (s)cissors : ")
                if(item =='r' or item == 'p' or item== 's'):        
                    break
            return item
    def get_computer_item(self):
        res=random.choice(['r','p','s'])
        return res
    
    def get_game_result(self, user_item, computer_item):
        if((user_item == 'r' and computer_item=='s') or user_item=='p'and computer_item=='r' or user_item=='s' and computer_item=='p'):
            return "win"
        elif((user_item == 'r' and computer_item=='p') or user_item=='p'and computer_item=='s' or user_item=='s' and computer_item=='r'):
            return "loss"
        else:
            return "draw"
    def play(self):
        user_item=self.get_user_item()
        print(f"You chose: {user_item}")
        computer_item=self.get_computer_item()
        print(f"The computer chose: {computer_item}")
        result=self.get_game_result(user_item, computer_item)
        results={'win':0,'loss':0,'draw':0}
        if result == "win":
            results['win'] += 1
            print("You win!")
        elif result == "loss":
            results['loss'] += 1
            print("You lose!")
        else:
            results['draw'] += 1
            print("It's a draw!")
        return results
    
    



