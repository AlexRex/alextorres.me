import { error } from '@sveltejs/kit';
import { photos } from '$lib/photos';

export function load({ params }) {
  const photo = photos.find(({ slug }) => slug === params.slug);

  if (!photo) throw error(404, 'Not found');

  return { photo };
}
