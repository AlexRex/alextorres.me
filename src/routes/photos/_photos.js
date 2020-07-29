// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import photos from './_photos.json';
import { getSlugFromString } from '../../utils';

const formattedPhotos = photos.map((photo) => {
  const slug = getSlugFromString(photo.id);

  return {
    ...photo,
    slug
  }
}).reverse();

export default formattedPhotos;
