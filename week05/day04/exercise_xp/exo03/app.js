import { readFile, writeFile } from './fileManager.js';

async function manageFiles() {
    try {
     
        const helloContent = await readFile('Hello_World.txt');
        console.log('Content of Hello World.txt:', helloContent);
    
        await writeFile('Bye_World.txt', 'Writing to the file');
        
        const byeContent = await readFile('Bye_World.txt');
        console.log('New content of Bye World.txt:', byeContent);
    } catch (error) {
        console.error('File operation failed:', error.message);
    }
}

manageFiles();