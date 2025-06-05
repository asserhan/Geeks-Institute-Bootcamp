// 1
const h1 = document.querySelector('h1');
console.log(h1);
// 2
const article = document.querySelector('article');
const paragraphs = article.querySelectorAll('p');
const lastParagraph = paragraphs[paragraphs.length - 1];
lastParagraph.remove();

// 3
const h2 = document.querySelector('h2');
h2.addEventListener('click', () => {
  h2.style.backgroundColor = 'red';
});
// 4
const h3 = document.querySelector('h3');
h3.addEventListener('click', () => {
  h3.style.display = 'none';
});

// 5
const button = document.getElementById('boldBtn');
button.addEventListener('click', () => {
  const allParagraphs = article.querySelectorAll('p');
  allParagraphs.forEach(p => {
    p.style.fontWeight = 'bold';
  });
});




// BONUS 1
h1.addEventListener('mouseenter', () => {
  const randomSize = Math.floor(Math.random() * 101); // 0 to 100
  h1.style.fontSize = randomSize + 'px';
});

// BONUS 2
const secondParagraph = paragraphs[1];
secondParagraph.addEventListener('mouseenter', () => {
  secondParagraph.classList.add('fade-out');
});
