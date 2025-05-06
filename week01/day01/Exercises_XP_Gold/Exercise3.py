while 1:
    try:
        name=input("What is your name\n")
        if(name=="hanane"):
            break
    except (KeyboardInterrupt,EOFError) :
        exit(1)
    