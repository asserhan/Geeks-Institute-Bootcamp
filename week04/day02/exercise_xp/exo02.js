const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];


for (let i = 0; i < colors.length; i++) {   
    let suffix = ordinal[(i < 3) ? i + 1 : 0]; 
    console.log(`${i + 1}${suffix} choice is ${colors[i]}.`);
}