// DOM Elements
const fetchButton = document.getElementById('fetchCharacter');
const loadingElement = document.getElementById('loading');
const characterCard = document.getElementById('character-card');
const characterName = document.getElementById('character-name');
const characterHeight = document.getElementById('character-height');
const characterGender = document.getElementById('character-gender');
const characterBirthYear = document.getElementById('character-birth-year');
const characterHomeworld = document.getElementById('character-homeworld');


const MAX_VALID_CHARACTERS = 70; 

async function fetchRandomCharacter() {
    try {
        loadingElement.style.display = 'block';
        characterCard.style.display = 'none';
        
      
        const randomId = Math.floor(Math.random() * MAX_VALID_CHARACTERS) + 1;
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Character not found (ID: ${randomId})`);
        }
        
        const characterData = await response.json();
        
        if (!characterData.result) {
            throw new Error('Character data missing in response');
        }
        
        try {
            const homeworldResponse = await fetch(characterData.result.properties.homeworld);
            if (!homeworldResponse.ok) throw new Error('Homeworld not found');
            const homeworldData = await homeworldResponse.json();
            return {
                ...characterData.result.properties,
                homeworldName: homeworldData.result.properties.name
            };
        } catch (homeworldError) {
            return {
                ...characterData.result.properties,
                homeworldName: 'Unknown'
            };
        }
        
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: "Oh No! That person isn't available." };
    } finally {
        loadingElement.style.display = 'none';
    }
}

function displayCharacter(character) {
    if (!character) return;
    
    if (character.error) {
        characterName.textContent = "Oh No!";
        characterHeight.textContent = "That person isn't available";
        characterGender.textContent = "";
        characterBirthYear.textContent = "";
        characterHomeworld.textContent = "";
    } else {
        characterName.textContent = character.name || 'Unknown';
        characterHeight.textContent = character.height ? `${character.height} cm` : 'Unknown';
        characterGender.textContent = character.gender || 'Unknown';
        characterBirthYear.textContent = character.birth_year || 'Unknown';
        characterHomeworld.textContent = character.homeworldName || 'Unknown';
    }
    
    characterCard.style.display = 'block';
}

fetchButton.addEventListener('click', async () => {
    const character = await fetchRandomCharacter();
    displayCharacter(character);
});

document.addEventListener('DOMContentLoaded', () => {
    fetchButton.click();
});