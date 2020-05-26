<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`til/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;

	const { metadata } = post;

	const tags = metadata.tags.replace(/ /g, '').split(',');
</script>

<style>
	.content {
    max-width: 700px;
    margin: 0 30px 50px 30px;
	}
	
	h3 {
		font-size: 1em;
		opacity: 0.5;
		margin-bottom: 0;
	}

	h1 {
		margin-top: 10px;
	}

	.post-html :global(img) {
		width: 85vw;
		max-width: 900px;
	}
</style>

<svelte:head>
	<title>{metadata.title}</title>
</svelte:head>

<div class="content">
	<h3>{new Date(metadata.date).toLocaleDateString()} · {#each tags as tag} <a href={`til?tag=${tag}`}>#{tag}</a> &nbsp; {/each} </h3>
	<h1>{metadata.title}</h1>

	<div class='post-html'>
		{@html post.html}
	</div>
</div>
