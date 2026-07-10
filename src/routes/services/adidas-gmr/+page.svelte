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
</style>

<svelte:head>
  <title>adidas GMR - sensor data at scale - Alex Torres</title>
  <meta
    name="description"
    content="Serverless AWS platform processing IMU sensor data from a wearable: protobuf/avro pipelines, video synchronization, dozens of lambdas." />
</svelte:head>

<div class="description">
  <p><a href="/services">← services</a> · <a href="/servicios/adidas-gmr">español</a></p>

  <h1>adidas GMR — sensor data at scale</h1>

  <h2>The problem</h2>
  <p>
    adidas GMR put a motion sensor inside a football insole. Every session
    produces streams of raw IMU data that have to be ingested, validated,
    processed and served back to a mobile game — reliably, for a global
    user base.
  </p>

  <h2>What I worked on</h2>
  <p>
    The serverless data platform behind the product, built on AWS as dozens of
    small services and lambdas.
  </p>
  <ul>
    <li>Ingestion and validation pipelines for sensor data, with
    protobuf/avro schemas as the contract between services.</li>
    <li>Synchronization of sensor streams with video for labelling and
    algorithm development.</li>
    <li>Supporting services: user management, notifications, campaign and
    session management, CI/CD tooling.</li>
  </ul>

  <h2>The result</h2>
  <p>
    A consumer product by a global brand, launched with EA — and the
    experience of building data pipelines that must not lose a single
    session.
  </p>
</div>

<div class="cta">
  <p>
    Building a product on top of sensor or event data?
    Write me at <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
