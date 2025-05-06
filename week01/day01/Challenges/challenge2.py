try:
    word=input("Input a word: ")
    set_word=set()
    res_word=""
    for char in word:
        if char not in set_word:
            set_word.add(char)
            res_word+=char

    print(res_word)
except (KeyboardInterrupt,EOFError):
    exit(1)