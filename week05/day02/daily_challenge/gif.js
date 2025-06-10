const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const gifForm = document.getElementById('gifForm');
const searchInput = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');
const deleteAllBtn = document.getElementById('deleteAll');


async function fetchRandomGif(searchTerm) {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(searchTerm)}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching GIF:', error);
        alert('Failed to fetch GIF. Please try again.');
        return null;
    }
}


function displayGif(gifData) {
    if (!gifData) return;
    
    const gifUrl = gifData.images.original.url;
    const gifTitle = gifData.title || 'No title';
    
    const gifItem = document.createElement('div');
    gifItem.className = 'gif-item';
    
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = gifTitle;
    img.style.maxWidth = '300px';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', () => {
        gifItem.remove();
    });
    
    gifItem.append(img, deleteBtn);
    gifContainer.appendChild(gifItem);
}


gifForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        const gifData = await fetchRandomGif(searchTerm);
        if (gifData) {
            displayGif(gifData);
        }
        searchInput.value = '';
    }
});


deleteAllBtn.addEventListener('click', () => {
    gifContainer.innerHTML = '';
});