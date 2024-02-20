import path from 'path';
import cheerio from 'cheerio';
import fs from 'fs';

// Recursive function to get .htm files
function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // If it's a directory, recursively traverse it
      getFiles(filePath, files);
    } else if (path.extname(filePath) === '.htm' 
    && !getLastElement(filePath).startsWith('dic')
    && !getLastElement(filePath).startsWith('table')
    ) {
      // If it's an .htm file, add it to the list
      files.push(filePath);
    }
  }
  return files;
}


// Usage
const dirPath = './docs/data/website'; // Replace with your directory path
const allFiles = getFiles(dirPath);
// console.log(allFiles)


// Function to extract information from a single .htm file
function extractInfoFromFile(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    const title = $('title').text();
    const bodyContent = $('body').text();
    const title2 = $('h2').text();
    const first = $('p:first').text();
    const titleEn = first.trim().split(' ').slice(0,  5).join(' ')+'...';
    const titleEn2 = first.trim().split(',')[0].replaceAll("'","");
    const links = [];
    $('a').each((i, link) => {
        const name  = getLastElement($(link).attr('href'))
        if (!name?.startsWith('dic') 
          && !name?.startsWith('index') 
          && !name?.endsWith('top')
          && !name?.startsWith('english')
          && !name?.startsWith('table')
          ) links.push(name);
    });

    return { title2, titleEn2, titleEn, title, first, links };
}

// Function to process all .htm files and output a JSON
function processFiles(filePaths) {
    const results = filePaths.map(filePath => {
        const info = extractInfoFromFile(filePath);
        return { file: getLastElement(filePath), info };
    });

    // Write the results to a JSON file
    const location = 'data3.json'
    const location1 = './docs/data/data.json'
    fs.writeFileSync(location, JSON.stringify(results, null,  2), 'utf-8');
    console.log('Data successfully saved to '+location);
}

function getLastElement(str) {
    return str?.substring(str.lastIndexOf('/') +  1);
}

// Usage
processFiles(allFiles);
