<script>
  const emailAddress = 'hey@alextorres.me';
  const mailto = `mailto:${emailAddress}?subject=Project inquiry`;
</script>

<style>
  .description {
    max-width: 800px;
    margin: 0 30px 50px 30px;
  }

  .case {
    margin: 30px 0;
  }

  .case h3 {
    margin-bottom: 5px;
  }

  .cta {
    background-color: rgb(240, 237, 220);
    padding: 30px;
    max-width: 740px;
    margin: 50px 30px;
  }
</style>

<svelte:head>
  <title>Services - Alex Torres</title>
  <meta
    name="description"
    content="Independent software consultant: interactive maps and geodata, data platforms, and custom tools for mobility, transport and sports tech." />
</svelte:head>

<div class="description">
  <p><a href="/servicios">Versión en español</a></p>

  <h2>What I do</h2>
  <p>
    I'm an independent software consultant. I build custom software for
    companies whose product runs on complex data — transport networks, vehicle
    fleets, sensor streams.
  </p>
  <ul>
    <li>
      <b>Maps and geodata</b> — interactive map libraries, geographic and
      schematic network maps, self-hosted vector tiles (no Google/Mapbox
      fees), GTFS tooling.
    </li>
    <li>
      <b>Data platforms and backend architecture</b> — serverless pipelines on
      AWS, splitting monoliths into services, architecture analysis before
      touching a line of code.
    </li>
    <li>
      <b>Custom tools</b> — internal ops tooling, browser-based PDF/print
      generation, editors for domain data.
    </li>
  </ul>

  <h2>Selected work</h2>

  <div class="case">
    <h3><a href="/services/annemasse">Annemasse Agglo — geographic transit map</a></h3>
    <p>
      Interactive map of the transport network with a self-hosted vector
      basemap (MapLibre + PMTiles/Protomaps): no per-request fees, no
      third-party map provider.
      <a href="https://test-annemasse-interactif.geotoni.fr" rel="noopener">
        See it live</a>.
    </p>
  </div>

  <div class="case">
    <h3><a href="/services/emt">EMT — network map and printed infographics</a></h3>
    <p>
      An embeddable JavaScript library to explore the bus network's lines and
      stops, and a PDF-generation system that uses the browser as a layout
      engine to print the infographics you see at actual bus stops.
      <a href="https://bus-map.alextorres.me" rel="noopener">See the map live</a>.
    </p>
  </div>

  <div class="case">
    <h3><a href="/services/cooltra">Cooltra — splitting a production platform</a></h3>
    <p>
      Extracting the station-based rental domain from a Kotlin monolith into
      its own services and AWS account, without stopping the business.
      Architecture analysis first, migration second.
    </p>
  </div>

  <div class="case">
    <h3><a href="/services/adidas-gmr">adidas GMR — sensor data at scale</a></h3>
    <p>
      Serverless AWS platform processing IMU sensor data from a wearable:
      protobuf/avro pipelines, video synchronization, dozens of lambdas.
    </p>
  </div>

  <div class="case">
    <h3><a href="/services/bicielx">Bicielx — where should the next station go?</a></h3>
    <p>
      Geospatial coverage analysis of a public bike-share network:
      coverage-deficit heatmap, census population within reach, and a
      data-backed proposal for a new station.
      <a href="https://analisis-bicielx.alextorres.me" rel="noopener">See it live</a>.
    </p>
  </div>
</div>

<div class="cta">
  <p>
    Need maps, a data platform or custom tooling?
    Write me at <a href={mailto}>{emailAddress}</a> and tell me about your
    project.
  </p>
</div>
