//1

// console.log(document.querySelector('div'));
//2

const lisOfitem=document.querySelectorAll('ul.list li')
lisOfitem.forEach((item)=>{
    if(item.textContent==="Pete"){

        item.textContent="Richard"
    }
    // console.log(item.textContent)
});
//3

// const secondUl=document.querySelectorAll('ul')[1]
// const secondLi=secondUl.querySelectorAll('li')[1]
// secondUl.removeChild(secondLi)
// console.log(secondUl)

//4


// const UlElem=document.querySelectorAll('ul.list li')
// UlElem.forEach((item)=>{
//     item.textContent="Hanane"
//     console.log(item)
// });

//=====================//

//1
// const Ulelem=document.querySelectorAll('ul.list')
// Ulelem.forEach((ul)=>{
//     ul.classList.add('student_list');
// });
// Ulelem.forEach((ul) => {
//   console.log(ul.className); 
// });

// //2
// const firstUL=document.querySelector('ul.list')
// firstUL.classList.add('university','attendance');
// console.log(firstUL.className);

//====================//

//1

const divElem=document.getElementById("container")
divElem.style.backgroundColor="lightblue"
divElem.style.padding="70px"

//2
/// dont display (the last <li> of the last <ul>)

const lastUl=document.querySelectorAll('ul.list li')
lastUl.forEach((li)=>{
    if(li.textContent.trim() ==="Dan")
        li.style.display="none"
});

//3

const fisttUl=document.querySelectorAll('ul.list li')
fisttUl.forEach((li)=>{
    if(li.textContent.trim() ==="Richard")
        li.style.border='5px solid red'
});

//4

const bodyElem=document.querySelector('body')
bodyElem.style.fontSize="30px"


const divElem2=document.getElementById("container")     
if(divElem2.style.backgroundColor==="lightblue"){
    const ulElem=document.querySelectorAll('ul.list li')
    ulElem.forEach((li)=>{
        alert(`Hello ${li.textContent}`)
    });
}

