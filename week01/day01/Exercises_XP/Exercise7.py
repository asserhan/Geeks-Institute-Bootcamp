basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove(basket[2])
basket.append("Kiwi")
basket.insert(0,"Apples")
len(basket)
basket.clear()
for item in basket:
    print(item)