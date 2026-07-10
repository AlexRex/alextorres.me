export const getSlugFromString = (string) => string.toLowerCase()
  .replace('.', '-') // replace a dot by a dash 
  .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
  .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
  .replace(/-+/g, '-') // collapse dashes
  .replace(/\//g, ''); // collapse all forward-slashes
 