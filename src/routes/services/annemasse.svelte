<script>
  const emailAddress = 'hey@alextorres.me';
  const mailto = `mailto:${emailAddress}?subject=Project inquiry`;
</script>

<style>
  .description {
    max-width: 800px;
    margin: 0 30px 50px 30px;
  }

  .cta {
    background-color: rgb(240, 237, 220);
    padding: 30px;
    max-width: 740px;
    margin: 50px 30px;
  }

  .map-embed {
    display: block;
    width: calc(100% - 60px);
    margin: 0 30px;
    height: 70vh;
    min-height: 500px;
    border: 1px solid rgb(240, 237, 220);
  }
</style>

<svelte:head>
  <title>Annemasse Agglo - geographic transit map - Alex Torres</title>
  <meta
    name="description"
    content="Interactive geographic map of a transport network with self-hosted vector tiles: MapLibre + PMTiles, no third-party map provider." />
</svelte:head>

<div class="description">
  <p><a href="/services">← services</a> · <a href="/servicios/annemasse">español</a></p>

  <h1>Annemasse Agglo — geographic transit map</h1>

  <h2>The problem</h2>
  <p>
    The transport network of the Annemasse agglomeration needed an interactive
    geographic map of its lines and stops. The usual way to build this — Google
    Maps or Mapbox — means a per-request bill that grows with traffic and a
    hard dependency on a third-party provider.
  </p>

  <h2>What I built</h2>
  <p>
    A map that owns its entire stack. The basemap is a vector-tile extract of
    the region (PMTiles, built from Protomaps data) served as a single static
    file — no tile server, no API keys, no usage fees. On top of it, MapLibre
    renders the network: lines and stops overlaid as SVG, interactive and
    styled to match the operator's brand.
  </p>
  <ul>
    <li>MapLibre GL for rendering, PMTiles/Protomaps for the basemap.</li>
    <li>The whole map deploys as static files — it can be hosted anywhere,
    including a CDN, for pennies.</li>
    <li>An editing mode for the operator to tune the map's defaults, kept out
    of the production build.</li>
  </ul>

  <h2>The result</h2>
  <p>
    A fast, brandable, interactive map with zero recurring map-provider costs.
  </p>

  <h2>Try it</h2>
  <p>
    The map, live — or
    <a href="https://test-annemasse-interactif.geotoni.fr" rel="noopener">
      open it full screen</a>.
    Map graphic design by
    <a href="https://geotoni.eu" rel="noopener">Toni</a>.
  </p>
</div>

<iframe
  class="map-embed"
  src="https://test-annemasse-interactif.geotoni.fr"
  title="Annemasse Agglo interactive transit map"
  loading="lazy" />

<div class="cta">
  <p>
    Paying too much for maps, or stuck with a PDF network plan?
    Write me at <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
