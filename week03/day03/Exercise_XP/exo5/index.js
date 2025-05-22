//1

console.log(document.querySelector('div'));
//2

const lisOfitem=document.querySelectorAll('ul.list li')
lisOfitem.forEach((item)=>{
    if(item.textContent==="Pete"){

        item.textContent="Richard"
    }
    console.log(item.textContent)
});
//3

const secondUl=document.querySelectorAll('ul')[1]
const secondLi=secondUl.querySelectorAll('li')[1]
secondUl.removeChild(secondLi)
console.log(secondUl)

//4


const UlElem=document.querySelectorAll('ul.list li')
UlElem.forEach((item)=>{
    item.textContent="Hanane"
    console.log(item)
});