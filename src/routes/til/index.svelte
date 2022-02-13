<script context="module">
  export function preload({ params, query, path }) {

		const { tag } = query;

		const url = tag ? `til.json?tag=${tag}` : `til.json`;

    return this.fetch(url)
      .then(r => r.json())
      .then(posts => {
        return { posts, tag };
      });
  }
</script>

<script>
	export let posts;
	export let tag;
</script>

<style>
  .content {
    max-width: 800px;
    margin: 0 auto;
  }

	.summary {
		background-color: whitesmoke;
    border-left: 4px solid gainsboro;
    padding-left: 10px;
	}
</style>

<svelte:head>
  <title>Today I Learned</title>
</svelte:head>

<div class="content">
	<h1>Today I Learned{tag ? ` about ${tag}` : ''}</h1>

	<ul>
		{#each posts as post}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<li>
				<a rel="prefetch" href="til/{post.slug}">{post.title}</a> - ({new Date(post.date).toLocaleDateString()})
				<p class="summary">{post.summary}</p>
			</li>
		{/each}
	</ul>
</div>

