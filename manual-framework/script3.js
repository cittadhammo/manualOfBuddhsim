import path from 'path';
import cheerio from 'cheerio';
import fs from 'fs';

function readFiles(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            filelist = readFiles(fullPath, filelist);
        } else if (path.extname(file) === '.html') {
            filelist.push(fullPath);
        }
    });
    return filelist;
}

// Function to parse HTML and extract data
function extractData(file) {
    const html = fs.readFileSync(file).toString();
    const $ = cheerio.load(html);
    // Extract data from the HTML using cheerio. For example, to get all text within <p> tags:
    const title = $('title').map((i, el) => $(el).text()).get();
    return { file, title };
}

// Read files, extract data, and write to JSON
const files = readFiles('./docs/data/website');
const data = files.map(extractData);
fs.writeFileSync('output3.json', JSON.stringify(data, null,  2));
