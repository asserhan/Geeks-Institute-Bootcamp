const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

module.exports = { readUsers, writeUsers };