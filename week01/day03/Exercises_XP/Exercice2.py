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