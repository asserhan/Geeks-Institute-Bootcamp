//1
const colors=["black","blue","gray","white","brown"]

//2

for(let i=0; i<colors.length; i++){
    console.log(`My #${i+1} choice is ${colors[i]}`);
}

//bonus
console.log("---------")
function getOrdinal(n) {
  if (n % 10 === 1) return n + "st";
  if (n % 10 === 2) return n + "nd";
  if (n % 10 === 3) return n + "rd";
  return n + "th";
}

colors.forEach((color, index) => {
  const ordinal = getOrdinal(index + 1);
  console.log(`My ${ordinal} choice: ${color}`);
});
