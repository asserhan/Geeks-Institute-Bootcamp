let star="*"
for (i=0;i<=6;i++){
    console.log(star.repeat(i))
}

console.log("---------")
let row;
for(let i=1;i<=6;i++){
    let row = ""
    for(let j=1;j<=i;j++){
        row+="*"
    }
    console.log(row)
}