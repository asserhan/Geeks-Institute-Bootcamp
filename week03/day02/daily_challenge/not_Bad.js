let sentence = "The movie is not that bad, I like it";
let wordNot=sentence.indexOf("not");
console.log(wordNot)
let wordBad=sentence.indexOf("bad")
console.log(wordBad)
if( wordNot!=-1 &&  wordBad!=-1 && wordBad>wordNot){
    let ReplaceString=sentence.replace(sentence.substring(wordNot,wordBad + 3),"good")
    console.log(ReplaceString)
}
else{
    console.log(sentence)
}