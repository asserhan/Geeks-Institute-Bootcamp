const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const query = 'sun';
const limit = 10;
const offset = 2;
const rating = 'g'; 

const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=${rating}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      return response.json().then(errData => {
        throw new Error(`GIPHY API Error: ${errData.message || `HTTP ${response.status}`}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('GIPHY API Response:', data);
    console.log('Received GIFs:', data.data.map(gif => ({
      id: gif.id,
      title: gif.title,
      url: gif.url
    })));
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });