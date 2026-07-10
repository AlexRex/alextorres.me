import { marked } from 'marked';
import { getSlugFromString } from './utils';

const files = import.meta.glob('/src/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

// ponytail: flat key: value frontmatter only — swap in a YAML parser if posts ever need more
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  const metadata = {};
  if (match) {
    for (const line of match[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > -1) metadata[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { metadata, body: raw.slice(match ? match[0].length : 0) };
}

export const posts = Object.values(files).map((raw) => {
  const { metadata, body } = parseFrontmatter(raw);

  return {
    metadata: {
      ...metadata,
      draft: metadata.draft === 'true',
      slug: getSlugFromString(metadata.title)
    },
    html: marked.parse(body)
  };
});
