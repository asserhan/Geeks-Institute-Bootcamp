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