<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  export let data;

  $: tag = browser ? $page.url.searchParams.get('tag') : null;
  $: posts = tag ? data.posts.filter((post) => post.tags && post.tags.includes(tag)) : data.posts;
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
			<li>
				<a href="/til/{post.slug}">{post.title}</a> - ({new Date(post.date).toLocaleDateString()})
				<p class="summary">{post.summary}</p>
			</li>
		{/each}
	</ul>
</div>
