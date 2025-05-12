#=======Exercise 1=======
class Cat():
    def __init__(self,name,age):
        self.name=name
        self.age=age
        print(name,age)
    def find_oldest_cat(cat1, cat2, cat3):
        if cat1.age>cat2.age and cat1.age>cat3.age:
            return cat1
        elif cat2.age>cat1.age and cat2.age>cat3.age:
            return cat2
        else:
            return cat3



cat1=Cat("simba",10)
cat2=Cat("sam",6)
cat3=Cat("catty",2)

oldest_cat = Cat.find_oldest_cat(cat1,cat2,cat3)
print(f"The oldest cat is {oldest_cat.name} and is {oldest_cat.age} years old.")
#=======Exercise 2=======
class Dog():
    def __init__(self,name,height):
        self.name=name
        self.height=height
    def bark(self):
        print(f"{self.name} goes woof!")
    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")

davids_dog=Dog("david",12)
sarahs_dog=Dog("sarah",4)

print(f"{davids_dog.name} is {davids_dog.height}cm")
print(f"{sarahs_dog.name} is {sarahs_dog.height}cm")

davids_dog.bark()
davids_dog.jump()

sarahs_dog.bark()
sarahs_dog.jump()
#compare dogs size
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger than {sarahs_dog.name}")
elif davids_dog.height < sarahs_dog.height:
    print(f"{sarahs_dog.name} is bigger than {davids_dog.name}")
else:
    print(f"{davids_dog.name} and {sarahs_dog.name} are the same size")
#=======Exercise 3=======
class Song():
    # lyrics of the song as list
    def __init__(self, lyrics):
        self.lyrics = lyrics
    
    def sing_me_a_song(self):
        for i in range(len(self.lyrics)):
            print(f"{self.lyrics[i]}\n")


stairway = Song(["There’s a lady who's sure", "all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()
#=======Exercise 4=======
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