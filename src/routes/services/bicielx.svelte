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
  <title>Bicielx - where should the next station go? - Alex Torres</title>
  <meta
    name="description"
    content="Geospatial coverage analysis for a public bike-share network: coverage-deficit heatmap, census population within reach, and a data-backed station proposal." />
</svelte:head>

<div class="description">
  <p><a href="/services">← services</a> · <a href="/servicios/bicielx">español</a></p>

  <h1>Bicielx — where should the next station go?</h1>

  <h2>The problem</h2>
  <p>
    Bicielx is the public bike-share network of Elche: 110 stations. Deciding
    where the next one goes is usually argued with opinions. I wanted to argue
    it with data — so I built the analysis myself and sent the proposal to the
    operator. Self-initiated, nobody asked for it.
  </p>

  <h2>What I did</h2>
  <ul>
    <li>A coverage-deficit heatmap of the whole served area: how far every
    point is from its nearest station, revealing the gaps in the network.</li>
    <li>Population within reach of the proposed spot, computed from official
    census data (INE, census-section level with areal interpolation) instead
    of crude density averages — which turned out to overestimate 7×.</li>
    <li>Honest methodology, stated limitations, and the defensible claim:
    the proposed spot sits in the worst-covered ~1% of the served area, the
    clearest gap on the network's south flank.</li>
    <li>Deliverables the operator can actually use: an interactive map and a
    two-page print-ready PDF.</li>
  </ul>

  <h2>The result</h2>
  <p>
    A data-backed proposal for a specific new station, submitted to the
    municipal operator.
  </p>

  <h2>Try it</h2>
  <p>
    The coverage analysis, live — or
    <a href="https://analisis-bicielx.alextorres.me" rel="noopener">
      open it full screen</a>.
  </p>
</div>

<iframe
  class="map-embed"
  src="https://analisis-bicielx.alextorres.me"
  title="Bicielx coverage analysis"
  loading="lazy" />

<div class="cta">
  <p>
    Planning where to grow a network — stations, stops, service areas?
    Write me at <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
