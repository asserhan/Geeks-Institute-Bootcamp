const apiKey='hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const q='hilarious'
const rating='g'
const apiUrl=`https://api.giphy.com/v1/gifs/search?q=${q}&rating=${rating}&api_key=${apiKey}`;

fetch (apiUrl)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    })
    .then (data =>{
        console.log('GIPHY API Response:',data);

    })
    .catch(error =>{
        console.error('Error fetching data:',error);
    });
    