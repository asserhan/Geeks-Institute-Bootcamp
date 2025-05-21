const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
names.sort()
console.log(names)
let secret_society=""

for(i=0;i<6;i++){
    secret_society+=names[i][0]
}
console.log(secret_society)