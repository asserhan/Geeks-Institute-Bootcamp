#=======exercise 1=======
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
    

class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'


bengal_obj=Bengal("catty",2)
chartreux_ob=Chartreux("itri",1)
siamese_obj=Siamese("simba",5)

all_cats=[bengal_obj,chartreux_ob,siamese_obj]

sara_pets=Pets(all_cats)

sara_pets.walk()

#=======exercise 2=======

class Dog():
    def __init__(self,name,age,weight):
        self.name=name
        self.age=age
        self.weight=weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight/(self.age * 10))

    def fight(self,other_dog):
        if not isinstance(other_dog,Dog):
            print("This argument must be an instance of class Dog")
        if (self.run_speed() * self.weight > other_dog.run_speed() * other_dog.weight):
            return f"{self.name} wins the fight"
        else:
            return f"{other_dog.name} wins the fight"

if __name__ == "__main__":

    dog1=Dog("boby",5,10)
    dog2=Dog("hasky",10,20)
    dog3=Dog("hamburg",8,15)

    print(dog1.bark())
    print(dog2.run_speed())
    print(dog1.fight(dog2))

#=======exercise 3=======
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


#=======exercise 4=======
class Person():
    def __init__(self,first_name,age,last_name=""):
        self.first_name=first_name
        self.age=age
        self.last_name=last_name

    def is_18(self):
        if self.age >= 18 :
            return True
        return False
    
class Family():
    def __init__(self,last_name,members=[]):
        self.last_name=last_name
        self.members=members

    def born(self,first_name, age):
        new=Person(first_name=first_name,age=age,last_name=self.last_name)
        self.members.append(new)

    def check_majority(self,first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")

    def family_presentation(self):
        print(f"family's last name is {self.last_name}")
        for member in self.members:
            print(f"{member.first_name} has {member.age}")

family1=Family("bennani smiras")
family1.born("kabour",65)
family1.born("chaibia",50)
family1.born("lhbib",10)
family1.family_presentation()
family1.check_majority("kabour")
family1.check_majority("lhbib")
