import fs from 'fs/promises';

export async function readFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

export async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Successfully wrote to ${filePath}`);
    } catch (error) {
        throw new Error(`Error writing to file: ${error.message}`);
    }
}