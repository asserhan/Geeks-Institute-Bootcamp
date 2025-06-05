function isAnagram(str1,str2){
    str1 = str1.replace(/\s+/g,'').toLowerCase(); //
    str2 = str2.replace(/\s+/g,'').toLowerCase();
    
    const sortedStr1 = str1.split('').sort().join('');
    const sortedStr2 = str2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}
console.log(isAnagram("listen", "silent")) // true
console.log(isAnagram("triangle", "integral")) // true
console.log(isAnagram("apple", "pale")) // false