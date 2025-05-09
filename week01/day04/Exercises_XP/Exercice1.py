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