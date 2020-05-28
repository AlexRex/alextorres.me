<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`photos/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { photo: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let photo;

  const { metadata } = photo;
</script>

<style>
  .header {
    margin: 0 30px 30px 30px;
  }

  h3 {
    font-size: 1em;
    opacity: 0.5;
    margin-bottom: 0;
  }

  h1 {
    margin-top: 10px;
  }

  .photo-container {
		max-width: 1080px;
    margin: 0 auto;
	}
	
	@media (max-width: 1080px) {
		.photo-container {
			margin: 0 30px;
		}
  }

  .photo {
    margin-bottom: 30px;
  }

  img {
		width: 100%;
  }

  .details {
    line-height: 2em;
  }
</style>

<svelte:head>
  <title>{photo.id}</title>
</svelte:head>

<div class="header">
  <h3>{new Date(metadata.date).toLocaleDateString()}</h3>
  <h1>{photo.id}</h1>
</div>

<div class="photo-container">
  <div class="photo">
    <picture>
      <source srcset={photo.resolutions['1080'].webpFile} type="image/webp" />
      <source srcset={photo.resolutions['1080'].jpgFile} type="image/jpeg" />
      <img src={photo.resolutions['1080'].jpgFile} alt={photo.metadata.id} />
    </picture>
  </div>

  <p class="details">
    <span>
      <b>Hardware:</b>
      {metadata.cameraBrand} {metadata.cameraModel} | {metadata.lensModel}
    </span>
    <br />
    <span>
      <b>Setup:</b>
      {metadata.exposure} | {metadata.aperture} | {metadata.iso} | {metadata.focal}
    </span>
    <br />
    <a href={photo.resolutions.original.jpgFile}>
      <b>Original</b>
    </a>

  </p>
</div>
