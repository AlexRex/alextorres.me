import rawPhotos from './photos.json';
import { getSlugFromString } from './utils';

export const photos = rawPhotos
  .map((photo) => ({ ...photo, slug: getSlugFromString(photo.id) }))
  .sort(
    (photoA, photoB) =>
      new Date(photoB.metadata.date).getTime() - new Date(photoA.metadata.date).getTime()
  );
