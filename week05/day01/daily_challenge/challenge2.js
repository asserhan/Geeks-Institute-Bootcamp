const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`

//require prompt

const prompt = require('prompt-sync')({ sigint: true });

function toJs(morseString) {
    return new Promise((resolve, reject) => {
        try {
            const morseObj = JSON.parse(morseString);
            if (Object.keys(morseObj).length === 0) {
                reject("Morse object is empty");
            } else {
                resolve(morseObj);
            }
        } catch (error) {
            reject("Invalid JSON format");
        }
    });
}


function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        const userInput = prompt("Enter a word or sentence to convert to Morse code:").toLowerCase();
        const morseArray = [];

        for (const char of userInput) {
            if (morseJS[char] !== undefined) {
                morseArray.push(morseJS[char]);
            } else {
                reject(`Character "${char}" does not exist in the Morse code dictionary.`);
                return;
            }
        }
        resolve(morseArray);
    });
}



// function joinWords(morseTranslation) {
//     return new Promise((resolve) => {
//         const morseOutput = morseTranslation.join('\n');
//         const outputElement = document.createElement('pre'); 
//         outputElement.textContent = morseOutput;
//         document.body.appendChild(outputElement);
//         resolve(morseOutput);
//     });
// }
function joinWords(morseTranslation) {
    return new Promise((resolve) => {
        const result = morseTranslation.join(' ');
        resolve(result);
    });
}

// Main function to execute the promises in sequence
//display an example of the morse code using console.log
function convertToMorse() {
    toJs(morse)
        .then(morseJS => toMorse(morseJS))
        .then(morseTranslation => joinWords(morseTranslation))
        .then(result => console.log("Morse Code Output:\n", result))
        .catch(error => console.error("Error:", error));
}

convertToMorse();
