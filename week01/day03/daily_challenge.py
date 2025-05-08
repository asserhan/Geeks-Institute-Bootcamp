class Farm():
    def __init__(self,farm_name):
        animals={}
        self.name=farm_name
        self.animals=animals
    
    def add_animal(self,animal_type,count=1):
        if animal_type not in self.animals:
            self.animals[animal_type]=count
        else:
            current_count=self.animals[animal_type]
            self.animals[animal_type]=current_count+1
        return self.animals
    #output:
# McDonald's farm

# cow : 5
# sheep : 2
# goat : 12

#     E-I-E-I-0!
    def get_info(self):
        info = f"{self.name}'s farm\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        info += "E-I-E-I-0!"
        return info



macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info())

