#1
brand={
    "name":"Zara",
    "creation_date": "1975",
    "creator_name": "Amancio Ortega Gaona", 
    "type_of_clothes": ["men", "women", "children", "home"], 
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": "7000" ,
    "major_color": {
        "France": "blue", 
        "Spain": "red", 
        "US": ["pink", "green"]
    }
}
#2
brand["number_stores"]=2

#3
print(f"Zara has clients from: {brand['type_of_clothes']}")

#4
brand["country_creation"]="Spain"

#5
if  "international_competitors" in brand.keys():
    brand["international_competitors"].append("Desigual")


#6
brand.pop("creation_date")

#7
print(f"the last international competitor of Zara is: {brand["international_competitors"][-1]}")

#8
print(f"The major clothes colors in US are: {brand["major_color"]["US"]}")

#9
print(f"The length of brand dict is: {len(brand)}")

#10
print(brand.keys())

#11
more_on_zara={
    "creation_date": "1975",
    "number_stores": "10 000"
}
#12

brand.update(more_on_zara)

#13
print(brand["number_stores"])

#the original value of number_stores updated by the new one in more_on_zara 
#because when append a dictionary to another one and have overlapping keys
#the final value will be taken from the second dict