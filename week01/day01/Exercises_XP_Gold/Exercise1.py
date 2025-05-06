
while 1:
    try:
        month=int(input("Invalid input. Please enter a number from 1 to 12 \n"))
    except ValueError:
        continue
    except KeyboardInterrupt:
        exit(1)
    except EOFError:
        exit(1)
    if (month < 1 or month > 12):
        continue
    if (int(month) >= 3 and int(month) <= 5):
        print("The season is Spring")
    elif (int(month) >= 6 and int(month) <= 8):
        print("The season is Summer")
    elif (int(month) >= 9 and int(month) <= 11):
        print("The season is Autumn")
    else:
        print("The season is Winter")
    break