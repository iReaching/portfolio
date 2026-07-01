# Andrei Rosca Portfolio

Modern static portfolio website for Andrei Rosca, an IT Support Specialist and Junior Web Developer. The site highlights hands-on IT support experience, full-stack projects, a demo reel, resume download, and contact links.

## Live Target

This project is configured for GitHub Pages under:

```text
https://ireaching.github.io
```

If deploying as a repository site, update `base` in `astro.config.mjs`.

## Tech Stack

- Astro
- Tailwind CSS
- TypeScript
- MDX content collections for project pages
- GitHub Actions for GitHub Pages deployment

## Current Sections

- Hero
- About
- Demo Reel
- Skills
- Projects
- Experience and Education Timeline
- Resume download
- Contact links

## Featured Projects

Project pages are stored in `src/content/projects/`.

- `condolink.mdx` - CondoLink capstone management system
- `portfolio-website.mdx` - Graduate portfolio site
- `slimeout.mdx` - Unity/C# maze game

## Project Structure

```text
/
|-- .github/workflows/deploy.yml
|-- public/
|   |-- demo-reel.mp4
|   |-- favicon.svg
|   |-- og-image.svg
|   `-- resume.pdf
|-- src/
|   |-- components/
|   |-- content/projects/
|   |-- data/site.ts
|   |-- layouts/
|   |-- pages/
|   |   |-- index.astro
|   |   `-- projects/[slug].astro
|   `-- styles/global.css
|-- astro.config.mjs
|-- package.json
`-- README.md
```

## Run Locally

Install dependencies:

```sh
npm install
```

Start the Astro dev server in background mode:

```sh
npm run dev
```

Check server status:

```sh
npm run dev:status
```

View server logs:

```sh
npm run dev:logs
```

Stop the background server:

```sh
npm run dev:stop
```

Build the production site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Edit Content

Update personal details and links in:

```text
src/data/site.ts
```

Update page sections in:

```text
src/components/About.astro
src/components/DemoReel.astro
src/components/Skills.astro
src/components/Timeline.astro
src/components/Resume.astro
src/components/Contact.astro
```

Add or edit project pages in:

```text
src/content/projects/
```

Each `.mdx` file becomes a project card and detail page. Use this frontmatter shape:

```md
---
title: "Project Name"
description: "Short project summary."
techStack: ["React", "TypeScript", "PHP", "MySQL"]
githubUrl: "https://github.com/iReaching/project"
liveUrl: "https://example.com"
featured: true
publishDate: 2025-01-01
order: 1
---
```

## Static Assets

Replace these files directly when needed:

```text
public/resume.pdf
public/demo-reel.mp4
public/og-image.svg
```

`demo-reel.mp4` is embedded in the Demo Reel section. `resume.pdf` is used by the resume download buttons.

## Deploy to GitHub Pages

1. Confirm `astro.config.mjs` has the right `site`:

```js
site: 'https://ireaching.github.io',
```

2. For a repository page such as `https://ireaching.github.io/portfolio`, uncomment and update:

```js
base: '/portfolio',
```

3. Commit and push:

```sh
git add .
git commit -m "Update portfolio"
git push
```

4. In GitHub repository settings:

- Go to `Settings > Pages`.
- Set `Build and deployment > Source` to `GitHub Actions`.

Pushes to `main` deploy automatically through `.github/workflows/deploy.yml`.

## Notes

- The contact form backend was removed; contact is handled through direct links.
- The site is fully static and suitable for GitHub Pages.
- Run `npm run build` before pushing changes.
