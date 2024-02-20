import path from 'path';
import cheerio from 'cheerio';
import fs from 'fs';

//import * as glob from 'glob';
import { glob } from 'glob';


// Use glob to find all HTML files
glob('./docs/data/website/**/*.html', function (err, files) {
  if (err) {
    console.error(err);
    return;
  }
  // Process each HTML file
  const data = files.map(file => {
    const html = fs.readFileSync(file).toString();
    const $ = cheerio.load(html);
    // Extract data from the HTML using cheerio. For example, to get all text within <p> tags:
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    return { file, paragraphs };
  });

  // Write the data to a JSON file
  fs.writeFileSync('output3.json', JSON.stringify(data, null,  2));
});


// // Function to read files from a directory and its subdirectories
// function readFiles1(dir, filelist) {
//     const files = fs.readdirSync(dir);
//     filelist = filelist || [];
//     files.forEach(function(file) {
//         if (fs.statSync(path.join(dir, file)).isDirectory()) {
//             filelist = readFiles(path.join(dir, file), filelist);
//         } else if (path.extname(file) === '.html') {
//             filelist.push(path.join(dir, file));
//         }
//     });
//     return filelist;
// }

// function readFiles(dir, filelist) {
//     const files = fs.readdirSync(dir);
//     filelist = filelist || [];
//     files.forEach(function(file) {
//         const fullPath = path.join(dir, file);
//         if (fs.statSync(fullPath).isDirectory()) {
//             filelist = readFiles(fullPath, filelist);
//         } else if (path.extname(file) === '.html') {
//             filelist.push(fullPath);
//         }
//     });
//     return filelist;
// }

// // Function to parse HTML and extract data
// function extractData(file) {
//     const html = fs.readFileSync(file).toString();
//     const $ = cheerio.load(html);
//     // Extract data from the HTML using cheerio. For example, to get all text within <p> tags:
//     const title = $('title').map((i, el) => $(el).text()).get();
//     return { file, title };
// }

// // Read files, extract data, and write to JSON
// const files = readFiles('./docs/data/website');
// const data = files.map(extractData);
// fs.writeFileSync('output2.json', JSON.stringify(data, null,  2));
