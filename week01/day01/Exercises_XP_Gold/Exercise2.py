#1
for i in range(1,21):
    print(i)
#2
print ("Elements has even index not even elements")
numbers=list(range(1,21))
for i in range(len(numbers)):
    if(i % 2 == 0):
        print(numbers[i])