class Zoo():
    def __init__(self,zoo_name):
        animals=[]
        self.zoo_name=zoo_name
        self.animals=animals
    def add_animal(self,new_animal):
        if(new_animal not in self.animals):
            self.animals.append(new_animal)

    def get_animals(self):
        for i in range(len(self.animals)):
            print(self.animals[i])

    def sell_animal(self,animal_sold):
        if(animal_sold in self.animals):
            self.animals.remove(animal_sold)

    def sort_animals(self):
        sorted_animals={}
        self.animals.sort()
        for animal in self.animals:
            first_letter=animal[0].upper()
            if first_letter not in sorted_animals:
                sorted_animals[first_letter]=[]
            sorted_animals[first_letter].append(animal.capitalize())
        return sorted_animals
    
    def get_groups(self):
        dict=self.sort_animals()
        for key,value in dict.items():
            print(f"{key}: {value}")
        






# Step 2: Create a Zoo instance
ramat_gan_safari = Zoo("Ramat Gan Safari")

# Step 3: Use the Zoo methods
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.get_animals()
ramat_gan_safari.sell_animal("Bear")
ramat_gan_safari.get_animals()
ramat_gan_safari.sort_animals()
ramat_gan_safari.get_groups()



