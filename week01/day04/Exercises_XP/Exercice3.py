from Exercice2 import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight,trained=False):
        super().__init__(name, age, weight)
        self.trained=trained
    
    def train(self):
        print(self.bark())
        self.trained=True
    
    def play(self,*args):
        print(f"{', '.join(args)} all play together")
        
    def do_a_trick(self,tricks=["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]):
        if self.trained == True:
            print(f"{self.name} {random.choice(tricks)}")


my_dog = PetDog("Fido", 2, 10)
my_dog.train()
my_dog.play("Buddy", "Max")
my_dog.do_a_trick()


