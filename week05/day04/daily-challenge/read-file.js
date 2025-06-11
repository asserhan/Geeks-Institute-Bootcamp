const fs = require('fs');

function readAndDisplayFile() {
    fs.readFile('./files/file-data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile content:');
        console.log(data);
    });
}

module.exports = readAndDisplayFile;
