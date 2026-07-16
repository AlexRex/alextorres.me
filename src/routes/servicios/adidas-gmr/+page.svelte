<script>
  const emailAddress = 'hey@alextorres.me';
  const mailto = `mailto:${emailAddress}?subject=Consulta de proyecto`;
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
  <title>adidas GMR - datos de sensores a escala - Alex Torres</title>
  <meta
    name="description"
    content="Plataforma serverless en AWS que procesa datos de sensores IMU de un wearable: pipelines protobuf/avro, sincronización con vídeo, decenas de lambdas." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="adidas GMR - datos de sensores a escala - Alex Torres" />
  <meta property="og:description" content="Plataforma serverless en AWS que procesa datos de sensores IMU de un wearable: pipelines protobuf/avro, sincronización con vídeo, decenas de lambdas." />
  <meta property="og:image" content="https://alextorres.me/og/services.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="description">
  <p><a href="/servicios">← servicios</a> · <a href="/services/adidas-gmr">English</a></p>

  <h1>adidas GMR: datos de sensores a escala</h1>

  <h2>El problema</h2>
  <p>
    adidas GMR metió un sensor de movimiento dentro de una plantilla de bota
    de fútbol. Cada sesión produce flujos de datos IMU en crudo que hay que
    ingerir, validar, procesar y devolver a un juego móvil. Y tiene que
    funcionar de forma fiable para una base de usuarios global.
  </p>

  <h2>En qué trabajé</h2>
  <p>
    La plataforma de datos serverless detrás del producto, construida en AWS
    como decenas de pequeños servicios y lambdas.
  </p>
  <ul>
    <li>Pipelines de ingesta y validación de datos de sensores, con esquemas
    protobuf/avro como contrato entre servicios.</li>
    <li>Sincronización de los flujos de sensores con vídeo para etiquetado y
    desarrollo de algoritmos.</li>
    <li>Servicios de apoyo: gestión de usuarios, notificaciones, gestión de
    campañas y sesiones, tooling de CI/CD.</li>
  </ul>

  <h2>El resultado</h2>
  <p>
    Un producto de consumo de una marca global, lanzado con EA, y la
    experiencia de construir pipelines de datos que no pueden perder ni una
    sola sesión.
  </p>
</div>

<div class="cta">
  <p>
    ¿Construyes un producto sobre datos de sensores o de eventos?
    Escríbeme a <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
