<script context="module">
  export async function preload({ params }) {
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
    margin: 0 auto;
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

  .post-html :global(code) {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

	.post-html :global(pre) {
		padding: 16px;
    overflow: auto;
    font-size: 95%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
	}

	.post-html :global(pre code) {
		display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: initial;
    border: 0;
	}

  :global(blockquote) {
    margin-left: 0;
    border-left: 5px grey solid;
    padding-left: 40px;
    background: rgba(0,0,0,0.05);
  }
</style>

<svelte:head>
  <title>{metadata.title}</title>
</svelte:head>

<div class="content">
  <h3>
    {new Date(metadata.date).toLocaleDateString()} ·
    {#each tags as tag}
      <a href={`til?tag=${tag}`}>#{tag}</a>
      &nbsp;
    {/each}
  </h3>
  <h1>{metadata.title}</h1>

  <div class="post-html">
    {@html post.html}
  </div>
</div>
