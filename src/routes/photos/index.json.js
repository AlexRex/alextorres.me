import photos from './_photos.js';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	const response = photos.sort((photoA, photoB) => 
		new Date(photoB.metadata.date).getTime() - new Date(photoA.metadata.date).getTime()
	);

	res.end(JSON.stringify(response));
}
