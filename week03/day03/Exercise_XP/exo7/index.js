//create an array called allBooks. each element of the array is an object with the following properties:
// title, author, img (url) and alreadyRead (boolean).
let allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        img: "https://images-na.ssl-images-amazon.com/images/I/51zj7x2gJLL._SX331_BO1,204,203,200_.jpg",
        alreadyRead: true
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        img: "https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwQL._SX324_BO1,204,203,200_.jpg",
        alreadyRead: false
    }
]

const section=document.querySelector(".listBooks")
allBooks.forEach((book)=>{
    const divelem=document.createElement('div')
    divelem.textContent = `${book.title} by ${book.author}`
    section.appendChild(divelem)
    //The width of the image has to be set to 100px.
    book.img = document.createElement('img')
    book.img.src = book.img
    book.img.style.width = "100px"
    if(book.alreadyRead){
        divelem.style.color = "red"
    }
}
);