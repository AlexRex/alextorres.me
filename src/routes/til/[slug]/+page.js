import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts';

export function load({ params }) {
  const post = posts.find(({ metadata }) => metadata.slug === params.slug);

  if (!post) throw error(404, 'Not found');

  return { post };
}
