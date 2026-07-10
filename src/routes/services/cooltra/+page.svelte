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
  <title>Cooltra - splitting a production platform - Alex Torres</title>
  <meta
    name="description"
    content="Extracting the station-based rental domain from a production Kotlin monolith into its own services and AWS account." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Cooltra - splitting a production platform - Alex Torres" />
  <meta property="og:description" content="Extracting the station-based rental domain from a production Kotlin monolith into its own services and AWS account." />
  <meta property="og:image" content="https://alextorres.me/og/services.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="description">
  <p><a href="/services">← services</a> · <a href="/servicios/cooltra">español</a></p>

  <h1>Cooltra — splitting a production platform</h1>

  <h2>The problem</h2>
  <p>
    Cooltra's vehicle-rental platform grew as one system serving two different
    businesses. The station-based rental domain needed to become independent —
    its own repository, its own services, its own AWS account — without
    stopping a platform that operates fleets every day.
  </p>

  <h2>What I did</h2>
  <p>
    Analysis before code. The first deliverable was a set of architecture
    documents mapping the platform: module graph, domain boundaries, shared
    libraries, runtime communication, AWS infrastructure, and the risks of
    every cut. Only then did extraction start, guided by those boundaries.
  </p>
  <ul>
    <li>Kotlin backend monorepo, React/TypeScript ops frontend, Next.js
    customer frontend, Terraform infrastructure.</li>
    <li>Dependency and coupling analysis to find the extraction boundary
    with the fewest risks.</li>
    <li>Incremental extraction: the business kept running on the monolith
    while the new services took over piece by piece.</li>
  </ul>

  <h2>The result</h2>
  <p>
    The station-based domain runs as its own platform, and the client keeps a
    written map of their architecture — useful long after the migration.
  </p>
</div>

<div class="cta">
  <p>
    Have a monolith that needs untangling?
    Write me at <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
