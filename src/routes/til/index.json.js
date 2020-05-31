import posts from './_posts.js';

const contents = posts.map(({ metadata }) => metadata);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const onlyTagged = req.query.tag
    ? contents.filter(({ tags }) => tags.includes(req.query.tag))
    : contents

  const response = onlyTagged
    .sort((postA, postB) =>
      new Date(postB.date).getTime() - new Date(postA.date).getTime()
    )
    .filter((post) => !post.draft);

  res.end(JSON.stringify(response));
}
