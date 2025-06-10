fetch("https://www.swapi.tech/api/starships/9/")
    .then(response => response.json())
    .then(objectStarWars => console.log(objectStarWars.result));


async function fetchStarshipData(){
    const apiUrl="https://www.swapi.tech/api/starships/9/";
    try {
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data=await response.json();
        if(!data.result){
            throw new Error("Unexpected API response structure");
        }
        console.log("Startship data :", data.result);
        return data.result;
    }
    catch(error){
        console.error("Failed to fetch starship data:", error.message);
        throw error;
    }
}

fetchStarshipData();