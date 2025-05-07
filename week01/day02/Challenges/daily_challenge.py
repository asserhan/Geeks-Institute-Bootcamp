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
         break;
            