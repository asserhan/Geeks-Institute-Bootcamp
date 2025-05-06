while 1:
    try:
        name=input("What is your name\n")
        if(name=="hanane"):
            break
    except KeyboardInterrupt :
        exit(1)
    except EOFError:
        exit(1)
    