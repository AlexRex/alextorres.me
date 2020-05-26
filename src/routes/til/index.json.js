import posts from './_posts.js';

const contents = posts.map(({ metadata }) => metadata);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	const response = req.query.tag
		? contents.filter(({ tags }) => tags.includes(req.query.tag))
		: contents;

		res.end(JSON.stringify(response));
}
