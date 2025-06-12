const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

async function readTasks() {
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

async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };