import { readFile, writeFile } from 'node:fs/promises';
import { readProjects } from './project-files.mjs';
if (process.argv.includes('--if-enabled') && process.env.REFRESH_GITHUB !== '1')
  process.exit(0);
const output = new URL('../src/data/github.json', import.meta.url);
const previous = JSON.parse(await readFile(output, 'utf8'));
const repositories = { ...previous.repositories };
let successes = 0;
for (const { data } of await readProjects()) {
  try {
    const headers = {
      'User-Agent': 'Andrei-Rosca-portfolio',
      Accept: 'application/vnd.github+json',
    };
    if (process.env.GITHUB_TOKEN)
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetch(
      `https://api.github.com/repos/${data.repository}`,
      { headers, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const repository = await response.json();
    repositories[data.repository] = {
      language: repository.language,
      pushedAt: repository.pushed_at,
      url: repository.html_url,
    };
    successes++;
  } catch {
    console.warn(
      'Keeping previous GitHub snapshot for ' +
        data.repository +
        ' (API unavailable).',
    );
  }
}
if (successes)
  await writeFile(
    output,
    JSON.stringify(
      { checkedAt: new Date().toISOString(), repositories },
      null,
      2,
    ) + '\n',
  );
console.log(
  'GitHub metadata refreshed for ' +
    successes +
    ' repositories. Builds can use the checked-in snapshot offline.',
);
