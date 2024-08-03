import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = path.join(__dirname, 'posts.json');

function readFile(){
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8')
    return JSON.parse(usersData)
  } catch (error) {
    console.error('Error reading users file:', error.message);
  }
}

function writeFile(newData) {
  try {
    const newUsersData = JSON.stringify(newData, null, 2)
    fs.writeFileSync(usersFilePath, newUsersData, 'utf8')
  } catch (error) {
    console.error('Error reading users file:', error);
  }
}

export {
  readFile,
  writeFile
}