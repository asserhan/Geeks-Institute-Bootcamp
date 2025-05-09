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
