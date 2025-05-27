console.log(KilosToGr(2))
function KilosToGr(arg){
    return arg*1000;
}

const Kilos=function(arg){
    return arg*1000;
}
console.log(Kilos(3))

const arrowKillos=(arg)=>{return arg*1000}
console.log(arrowKillos(5))

//the diffrence between the function declaration and fuction expression : 
//function declaration you can call it before it’s defined in the code but fuction expression you cannot 