// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import posts from '../../posts/*.md';

const formattedPosts = posts.map((post) => {
  const slug = post.metadata.title
    .toLowerCase()
    .replace('.', '-') // replace a dot by a dash 
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
    .replace(/-+/g, '-') // collapse dashes
    .replace(/\//g, ''); // collapse all forward-slashes

  return {
    ...post,
    metadata: {
      ...post.metadata,
      slug
    }
  }
});

export default formattedPosts;
