import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

import https from 'https';

// Create an HTTPS agent with the necessary certificate
// const httpsAgent = new https.Agent({
//   ca: fs.readFileSync('./path/to/your/certificate.pem'),
//   cert: fs.readFileSync('./path/to/your/certificate.pem'),
// });

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Make a request to the website
axios.get('https://www.palikanon.com/english/wtb/dic_idx.html', { httpsAgent })
// axios.get('https://www.palikanon.com/english/wtb/dic_idx.html')
  .then(response => {
    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Initialize arrays to hold the data
    const titles = [];
    const links = [];
    const bodies = [];

    // Select each article and extract the title, link, and body content
    $('article').each((i, element) => {
      titles.push($(element).find('h2').text());
      links.push($(element).find('a').attr('href'));
    });

    // Extract the body content
    const bodyContent = $('body').html();

    // Combine the titles, links, and bodies into an array of objects
    const data = titles.map((title, i) => ({
      title,
      link: links[i],
      body: bodyContent // Assuming you want the entire body content for each article
    }));

    // Convert the array of objects to a JSON string
    const json = JSON.stringify(data, null,   2);

    // Write the JSON string to a file
    fs.writeFile('output.json', json, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch(console.error);
