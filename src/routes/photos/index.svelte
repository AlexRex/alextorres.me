<script context="module">
  export function preload({ params, query, path }) {
    return this.fetch("photos.json")
      .then(r => r.json())
      .then(photos => {
        return { photos };
      });
  }
</script>

<script>
  export let photos;
</script>

<style>
  .content {
    margin: 0 30px 50px 30px;
  }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .picture {
    flex-grow: 1;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>Photos</title>
</svelte:head>

<div class="content">
  <h1>Some pictures</h1>

  <ul class="gallery">
    {#each photos as photo}
      <li class="picture">
        <a href={`photos/${photo.slug}`}>
          <picture>
            <source
              srcset={photo.resolutions['256'].webpFile}
              type="image/webp" />
            <source
              srcset={photo.resolutions['256'].jpgFile}
              type="image/jpeg" />
            <img
              src={photo.resolutions['256'].jpgFile}
              alt={photo.metadata.id} />
          </picture>
        </a>
      </li>
    {/each}
  </ul>
</div>
