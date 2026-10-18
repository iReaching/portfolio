import { readdir, readFile } from 'node:fs/promises';
import { parse } from 'yaml';
export async function readProjects() {
  const directory = new URL('../src/content/projects/', import.meta.url);
  const names = (await readdir(directory)).filter((name) =>
    /\.(md|mdx)$/.test(name),
  );
  return Promise.all(
    names.map(async (name) => {
      const content = await readFile(new URL(name, directory), 'utf8');
      const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) throw new Error('Missing project frontmatter: ' + name);
      return {
        id: name.replace(/\.(md|mdx)$/, ''),
        data: parse(frontmatter[1]),
      };
    }),
  );
}
