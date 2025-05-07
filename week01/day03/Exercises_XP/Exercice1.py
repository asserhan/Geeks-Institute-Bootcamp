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

