import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readProjects } from './project-files.mjs';
import { site } from '../src/data/profile.ts';
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[char],
  );
await mkdir('public/previews', { recursive: true });
function artwork(title, subtitle, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101416"/><path d="M80 100H1120M80 530H1120" stroke="#354246"/><text x="80" y="76" fill="#74ddcc" font-family="Arial,sans-serif" font-size="22" letter-spacing="3">ANDREI ROSCA · ${escape(label)}</text><text x="80" y="270" fill="#eff3f2" font-family="Arial,sans-serif" font-weight="600" font-size="72" letter-spacing="-3">${escape(title)}</text><text x="80" y="350" fill="#a8b5b6" font-family="Arial,sans-serif" font-size="28">${escape(subtitle)}</text><text x="80" y="490" fill="#74ddcc" font-family="Arial,sans-serif" font-size="23">ireaching.github.io/portfolio</text><circle cx="1098" cy="475" r="18" fill="#74ddcc"/></svg>`;
}
const main = artwork(
  site.name,
  'Web development & hands-on IT support',
  'PORTFOLIO',
);
await writeFile('public/og-image.svg', main + '\n');
await sharp(Buffer.from(main)).png().toFile('public/og-image.png');
for (const project of await readProjects()) {
  await sharp(
    Buffer.from(
      artwork(
        project.data.title,
        project.data.techStack.join(' · '),
        'PROJECT CASE STUDY',
      ),
    ),
  )
    .png()
    .toFile(`public/previews/${project.id}.png`);
}
await sharp(await readFile('public/favicon.svg'))
  .resize(32, 32)
  .png()
  .toFile('public/favicon.png');
console.log('Generated raster social previews and favicon.');
