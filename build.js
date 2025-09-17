import 'dotenv/config';
import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';

// 1. Setup client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// 2. Generate HTML for each entry
async function build() {
  const entries = await client.getEntries();

  const projectsHtml = entries.items.map(item => {
    const title = item.fields.projectTitle;
    const fileTitle = item.fields.projectTitle.split(' ').join('_').toLowerCase() + '.html';

    let imageUrl = 'https:' + item.fields.projectImage.fields.file.url;

    const imagesHtml = item.fields.projectImages.map((image) => {
      const file = image.fields.file;
      return `<img src="https:${file.url}" ${file.details.image.height > file.details.image.width ? 'class="pojedyncze"' : ''}>`;
    }).join('');

    const fileHtml = `
      <!DOCTYPE html>
      <html lang="pl">
        <head>
          <!-- Font awesome -->
          <script src="https://kit.fontawesome.com/7994736079.js" crossorigin="anonymous"></script>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Maciek Ginalski</title>
          <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico">
          <link rel="stylesheet" href="../css/style.css">
          <link rel="stylesheet" href="../css/projekt.css">
          <script type="module" src="../index.js"></script>
        </head>
        <body>
          <my-header></my-header>
          <main>
            ${imagesHtml}
          </main>
          <my-footer></my-footer>
          <a href="#" class="to-top">
            <i class="fas fa-chevron-up"></i>
          </a>
        </body>
      </html>
    `;

    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }
    const filePath = path.join(process.cwd(), '/dist', fileTitle);
    fs.writeFileSync(filePath, fileHtml);

    return `
      <div>
        <a href="dist/${fileTitle}">
          <img src="${imageUrl}">
          ${title}
        </a>
      </div>
    `
  }).join(`\n`);

  const filePath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(filePath, 'utf-8');

  const startMarker = '<!-- CONTENTFUL_START -->';
  const endMarker = '<!-- CONTENTFUL_END -->';
  const markerBlock = `${startMarker}\n${projectsHtml}\n${endMarker}`;
  const markerRegex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'm');
  
  html = html.replace(markerRegex, markerBlock);

  const outPath = path.join(process.cwd(), 'index.html');
  fs.writeFileSync(outPath, html, 'utf-8');
}

build();