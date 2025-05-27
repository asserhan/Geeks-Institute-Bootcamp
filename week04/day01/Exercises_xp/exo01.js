// #1
// function funcOne() {
//     let a = 5;
//     if(a > 1) {
//         a = 3;
//     }
//     console.log(`inside the funcOne function ${a}`);
// }
// funcOne()
//#1.1 it will print 3 cause a delclared outside the scope
//#1.2 if we use const insted of let it will give as typeerror because we can't reassign a const variable

//#2
// let a = 0;
// function funcTwo() {
//     a = 5;
// }

// function funcThree() {
//     console.log(`inside the funcThree function ${a}`);
// }
// funcThree() // a=0
// funcTwo() // a become 5
// funcThree() // a=5 because a ressign it to 5 
//#2.2 if we use const insted of let it will give as typeerror because we can't reassign a const variable

//#3
// function funcFour() {
//     global.a = "hello";
// }


// function funcFive() {
//     console.log(`inside the funcFive function ${a}`);
// }

// // #3.1 - run in the console:
// funcFour()
// funcFive() // 5 the local variable shadow the global a


//#4
// const a = 1;
// function funcSix() {
//     const a = "test";
//     console.log(`inside the funcSix function ${a}`);
// }


// // #4.1 - run in the console:
// funcSix() // test because we change test inside the function scope
// #4.2 What will happen if the variable is declared 
// with const instead of let ? nothing if will work the same because we declare a new variable

//#5
let a = 2;
if (true) {
    let a = 5;
    console.log(`in the if block ${a}`); // 5
}
console.log(`outside of the if block ${a}`); //2 

// #5.1 - run the code in the console 
// in the if condition we create  a new variable local to that block
// #5.2 What will happen if the variable is declared 
// with const instead of let ? // the same output because it a new variable
