import 'dotenv/config';
import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

function getFileTitle(projectTitle) {
  return projectTitle.split(' ').join('_').toLowerCase() + '.html';
}

function buildImagesHtml(projectImages) {
  return projectImages.map((image) => {
    const file = image.fields.file;
    const isPortrait = file.details.image.height > file.details.image.width;
    return `<div class="photo-container${isPortrait ? ' singular' : ''}"><img class="photo" src="https:${file.url}"></div>`;
  }).join('');
}

function buildProjectPageHtml(title, imagesHtml) {
  return `<!DOCTYPE html>
<html lang="pl">
  <head>
    <script src="https://kit.fontawesome.com/7994736079.js" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maciek Ginalski</title>
    <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/project.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/footer.css">
    <script type="module" src="../index.js"></script>
  </head>
  <body>
    <my-header></my-header>
    <main class="project-main">
      <div class="header-placeholder"></div>
      <h2 class="project-title">${title}</h2>
      <div class="photo-grid">
        ${imagesHtml}
      </div>
    </main>
    <my-footer></my-footer>
    <a href="#" class="to-top">
      <i class="fas fa-chevron-up"></i>
    </a>
  </body>
</html>`;
}

function buildProjectTileHtml(fileTitle, imageUrl, title) {
  return `
          <div class="project-container">
            <a class="project-anchor" href="dist/${fileTitle}">
              <div class="project-image-wrapper">
                <img class="project-image" src="${imageUrl}">
              </div>
              <span class="project-title">${title}</span>
            </a>
          </div>`;
}

function writeDistFile(fileTitle, content) {
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  fs.writeFileSync(path.join(distDir, fileTitle), content);
}

function injectIntoIndex(projectsHtml) {
  const indexPath = path.join(process.cwd(), 'index.html');
  const startMarker = '<!-- CONTENTFUL_START -->';
  const endMarker = '<!-- CONTENTFUL_END -->';

  const indentedHtml = projectsHtml.replace(/^/gm, '\t\t');
  const markerBlock = `${startMarker}\n${indentedHtml}\n\n\t\t\t\t${endMarker}`;
  const markerRegex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'm');

  const updated = fs.readFileSync(indexPath, 'utf-8').replace(markerRegex, markerBlock);
  fs.writeFileSync(indexPath, updated, 'utf-8');
}

async function build() {
  const entries = await client.getEntries();

  const projectTiles = entries.items.map((item) => {
    const title = item.fields.projectTitle;
    const fileTitle = getFileTitle(title);
    const imageUrl = 'https:' + item.fields.projectImage.fields.file.url;
    const imagesHtml = buildImagesHtml(item.fields.projectImages);

    // Zapis pliku projektu
    writeDistFile(fileTitle, buildProjectPageHtml(title, imagesHtml));

    return buildProjectTileHtml(fileTitle, imageUrl, title);
  });

  injectIntoIndex(projectTiles.join('\n'));
}

build();