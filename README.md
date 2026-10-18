# Andrei Rosca — Portfolio

A static Astro portfolio for web development and IT support. Production target:
**https://ireaching.github.io/portfolio/**

## Requirements

Node.js **22.22+** (Node 24 LTS recommended) and npm. TypeScript 6 is used because the Astro checker currently supports TypeScript 5/6.

```sh
npm ci
npm run dev
```

The development server runs in background mode, as required by AGENTS.md:

```sh
npm run dev:status
npm run dev:logs
npm run dev:stop
```

## Verification

```sh
npm run check
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
```

The build includes local route/anchor/asset checks, non-empty project validation, metadata checks, and résumé/video verification. Browser tests start and stop a production preview automatically on port 4322. They cover project filters, booking conflicts and staff review, mobile keyboard navigation, theme persistence, WCAG checks in both themes, responsive widths, reduced motion, and no-JavaScript behavior.

On Windows, Chromium tests use installed Microsoft Edge. On other platforms they use Playwright Chromium. For the quick Windows browser suite: `npm run test:e2e:chromium`.

`npm run format` formats source, scripts, tests, and documentation.

## Content and architecture

- `src/data/profile.ts`: shared professional facts used by the homepage and printable résumé.
- `src/data/site.ts`: base-aware link helpers.
- `src/content/projects/*.mdx`: validated case studies; sorted by explicit `order`.
- `src/assets/projects/`: real screenshots or labeled frames from the supplied reel.
- `src/pages/projects/[slug].astro`: generated detail pages, contents navigation, social previews, repository context.
- `src/components/WorkflowDemo.astro`: a separate sample-data illustration. It does not connect to CondoLink.
- `src/pages/resume.astro`: readable, printable HTML résumé.
- `public/resume.pdf`: PDF exported from that shared résumé.
- `src/styles/global.css`: responsive layout, semantic dark/light tokens, focus and motion preferences.

Projects require title, description, technologies, source URL, repository identifier, image/alt/caption, category, role, explicit date and order. Use a relative image path such as `../../assets/projects/your-project.webp`. Categories are defined in `src/content.config.ts`. Use `featured: true` selectively.

Dates and responsibilities come from the existing portfolio. Graduation wording is deliberately neutral pending confirmation. No invented employment, adoption metrics, testimonials, or support incidents are published. See [remaining content needs](docs/content-needed.md).

## Résumé updates

Update `src/data/profile.ts` and the selected-project summary in `src/pages/resume.astro`. With the background dev server running:

```sh
npm run resume:export
npm run build
```

The exporter uses Microsoft Edge on Windows, or Playwright Chromium elsewhere. Set `PLAYWRIGHT_CHANNEL` to choose another installed Chromium channel. The PDF is generated locally, not during every CI build, so deployment does not require a browser just to render the site.

The résumé omits unconfirmed graduation language, the retired demo domain, and the third-party reference contact from the old PDF. Confirm your preferred final wording before sharing it with employers.

## Media and social previews

The reel is opt-in (`preload="none"`) with a poster, visual summary, and a WebVTT description track. The description track describes visuals; it is not a verified transcript of speech.

`npm run media:optimize -- path/to/original.mp4` creates a 720p encode with fast-start metadata and regenerates the poster. Use an original source file to avoid repeatedly re-encoding a compressed copy. Review interface readability before replacing media.

The current project images were captured from the existing reel and the deployed React portfolio. Replace the reel frames with clean screenshots when available. The SLIMEOUT image is a cropped gameplay detail.

`scripts/generate-previews.mjs` generates PNG sharing previews from code-native SVG artwork before each build. After changing names or technologies, the normal build regenerates them.

## Optional GitHub metadata

Repository details are read from a checked-in snapshot. No visitor API requests or browser tokens are used.

```sh
npm run refresh:github
```

To refresh during a build, set `REFRESH_GITHUB=1` in the environment. Failed API requests retain cached data. Ordinary builds use the snapshot and do not require GitHub API availability. `GITHUB_TOKEN` is optional and is read only by the refresh script.

## GitHub Pages

Only `.github/workflows/deploy.yml` publishes production. It validates and builds the site, uploads **dist**, then deploys that artifact. `.github/workflows/ci.yml` validates pull requests and runs browser tests without deploying.

In repository Settings → Pages, use **GitHub Actions** as the source. Configuration:

```js
site: 'https://ireaching.github.io',
base: '/portfolio',
output: 'static',
```

Use the URL helpers for local links and assets. Generated canonical URLs and the sitemap include the project base.

The generated sitemap is at `https://ireaching.github.io/portfolio/sitemap-index.xml`. Crawlers read robots rules from **https://ireaching.github.io/robots.txt**. A file at `/portfolio/robots.txt` would not control crawlers; manage robots at the account-site root if you control that separate site.

Dependabot checks npm packages and GitHub Actions monthly. Keep dependency updates reviewable and run the validation suite before merging.
