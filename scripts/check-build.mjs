import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { readProjects } from './project-files.mjs';
const root = path.resolve('dist');
const base = '/portfolio/';
const projects = await readProjects();
assert(projects.length > 0, 'Project collection must not be empty');
const required = [
  'index.html',
  'resume/index.html',
  '404.html',
  'sitemap-index.xml',
  'resume.pdf',
  'demo-reel.mp4',
  'og-image.png',
  ...projects.map((project) => `projects/${project.id}/index.html`),
];
for (const filename of required)
  assert(
    (await stat(path.join(root, filename))).size > 0,
    'Missing or empty output: ' + filename,
  );
const htmlFiles = (await readdir(root, { recursive: true })).filter((name) =>
  name.endsWith('.html'),
);
const cache = new Map();
async function readHTML(filename) {
  if (!cache.has(filename))
    cache.set(filename, await readFile(filename, 'utf8'));
  return cache.get(filename);
}
for (const filename of htmlFiles) {
  const absolute = path.join(root, filename);
  const html = await readHTML(absolute);
  assert(
    !/yourusername|condolink\.click/.test(html),
    'Placeholder or retired destination in ' + filename,
  );
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    'Expected one H1: ' + filename,
  );
  assert(/<title>[^<]+<\/title>/.test(html), 'Missing title: ' + filename);
  assert(/rel="canonical"/.test(html), 'Missing canonical: ' + filename);
  const relative = filename.replaceAll('\\', '/').replace(/index\.html$/, '');
  const pageURL = new URL(base + relative, 'https://ireaching.github.io');
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:mailto:|tel:|data:|javascript:)/.test(href)) continue;
    const url = new URL(href, pageURL);
    if (url.origin !== pageURL.origin) continue;
    // A linked historical project can share the Pages origin while living
    // outside this application's base. Only explicit live destinations qualify.
    if (projects.some((project) => project.data.liveUrl === url.href)) continue;
    assert(
      url.pathname.startsWith(base),
      'Link escapes GitHub Pages base: ' + href,
    );
    let target = path.join(
      root,
      decodeURIComponent(url.pathname.slice(base.length)),
    );
    if (!path.extname(target)) target = path.join(target, 'index.html');
    const info = await stat(target).catch(() => null);
    assert(info?.isFile(), 'Broken local link in ' + filename + ': ' + href);
    if (url.hash && target.endsWith('.html')) {
      const destination = await readHTML(target);
      const id = decodeURIComponent(url.hash.slice(1));
      assert(
        destination.includes('id="' + id + '"'),
        'Missing anchor in ' + filename + ': ' + href,
      );
    }
  }
}
const pdf = await readFile(path.join(root, 'resume.pdf'));
assert(pdf.subarray(0, 5).toString() === '%PDF-', 'Résumé must be a PDF');
const video = await readFile(path.join(root, 'demo-reel.mp4'));
const boxes = [];
for (let offset = 0; offset + 8 <= video.length;) {
  const size = video.readUInt32BE(offset);
  assert(size >= 8, 'Invalid MP4 box');
  boxes.push(video.toString('ascii', offset + 4, offset + 8));
  offset += size;
}
assert(
  boxes.indexOf('moov') >= 0 && boxes.indexOf('moov') < boxes.indexOf('mdat'),
  'Video must have fast-start metadata',
);
console.log(
  `Validated ${htmlFiles.length} pages, ${projects.length} project routes, local assets/anchors, résumé, sitemap and MP4 fast start.`,
);
