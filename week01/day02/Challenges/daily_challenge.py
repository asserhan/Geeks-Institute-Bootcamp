dict_word={}


while 1:
    has_digit=0
    word =input("Enter a word: ")
    for i in range(len(word)):
        if(word[i].isdigit()):
            has_digit=1
    if(has_digit):
        print("the word must be a string")
        continue
    else:
         for item in enumerate(word):
            if(item[1] not in dict_word):
                 dict_word[item[1]] = []
            dict_word[item[1]].append(item[0])
         break;

print(dict_word)
            