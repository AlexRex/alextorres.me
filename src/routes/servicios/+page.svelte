<script>
  const emailAddress = 'hey@alextorres.me';
  const mailto = `mailto:${emailAddress}?subject=Consulta de proyecto`;
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
  <title>Servicios - Alex Torres</title>
  <meta
    name="description"
    content="Consultor de software independiente: mapas interactivos y geodatos, plataformas de datos y herramientas a medida para movilidad, transporte y tecnología deportiva." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Servicios - Alex Torres" />
  <meta property="og:description" content="Consultor de software independiente: mapas interactivos y geodatos, plataformas de datos y herramientas a medida para movilidad, transporte y tecnología deportiva." />
  <meta property="og:image" content="https://alextorres.me/og/services.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="description">
  <p><a href="/services">English version</a></p>

  <h2>Qué hago</h2>
  <p>
    Soy consultor de software independiente. Construyo software a medida para
    empresas cuyo producto depende de datos complejos: redes de transporte,
    flotas de vehículos, flujos de sensores.
  </p>
  <ul>
    <li>
      <b>Mapas y geodatos:</b> librerías de mapas interactivos, mapas de red
      geográficos y esquemáticos, teselas vectoriales auto-hospedadas (sin
      cuotas de Google/Mapbox), herramientas GTFS.
    </li>
    <li>
      <b>Plataformas de datos y arquitectura backend:</b> pipelines
      serverless en AWS, división de monolitos en servicios, análisis de
      arquitectura antes de tocar una línea de código.
    </li>
    <li>
      <b>Herramientas a medida:</b> tooling interno de operaciones,
      generación de PDF/impresión desde el navegador, editores de datos de
      dominio.
    </li>
  </ul>

  <h2>Cómo trabajo</h2>
  <ol>
    <li>
      <b>Entender primero.</b> Antes de escribir código, mapeo el problema.
      En una migración eso fueron documentos de arquitectura que el cliente
      todavía conserva; en un mapa nuevo, los datos de la red y cómo la usa
      la gente.
    </li>
    <li>
      <b>Algo funcionando, pronto.</b> Una demo en vivo en las primeras
      semanas, no una presentación. Cada caso de abajo tiene una que puedes
      abrir.
    </li>
    <li>
      <b>Entregables que puedes usar sin mí.</b> Documentación, modos de
      edición, salida lista para imprimir. Mi trabajo está hecho cuando tu
      equipo ya no me necesita, no cuando se envía la factura.
    </li>
  </ol>
  <p>
    Acepto proyectos cerrados, colaboraciones continuas y trabajo integrado
    en tu equipo, trabajando en remoto desde España.
  </p>

  <h2>Proyectos destacados</h2>

  <div class="case">
    <h3><a href="/servicios/annemasse">Annemasse Agglo: mapa geográfico de transporte</a></h3>
    <p>
      Mapa interactivo de la red de transporte con basemap vectorial
      auto-hospedado (MapLibre + PMTiles/Protomaps): sin coste por petición,
      sin proveedor de mapas de terceros.
      <a href="https://annemasse.alextorres.me" rel="noopener">
        Verlo en vivo</a>.
    </p>
  </div>

  <div class="case">
    <h3><a href="/servicios/emt">EMT: mapa de red e infografías impresas</a></h3>
    <p>
      Una librería JavaScript embebible para explorar las líneas y paradas de
      la red de autobuses, y un sistema de generación de PDF que usa el
      navegador como motor de maquetación para imprimir las infografías que
      ves en las paradas reales.
      <a href="https://bus-map.alextorres.me" rel="noopener">Ver el mapa en vivo</a>.
    </p>
  </div>

  <div class="case">
    <h3><a href="/servicios/cooltra">Cooltra: dividir una plataforma en producción</a></h3>
    <p>
      Extracción del dominio de alquiler station-based de un monolito Kotlin a
      sus propios servicios y cuenta de AWS, sin parar el negocio. Primero el
      análisis de arquitectura, después la migración.
    </p>
  </div>

  <div class="case">
    <h3><a href="/servicios/adidas-gmr">adidas GMR: datos de sensores a escala</a></h3>
    <p>
      Plataforma serverless en AWS que procesa datos de sensores IMU de un
      wearable: pipelines protobuf/avro, sincronización con vídeo, decenas de
      lambdas.
    </p>
  </div>

  <div class="case">
    <h3><a href="/servicios/bicielx">Bicielx: ¿dónde debería ir la próxima estación?</a></h3>
    <p>
      Análisis geoespacial de cobertura de una red de bicicleta pública: mapa
      de calor de déficit de cobertura, población censal al alcance y una
      propuesta de nueva estación respaldada por datos.
      <a href="https://analisis-bicielx.alextorres.me" rel="noopener">Verlo en vivo</a>.
    </p>
  </div>
</div>

<div class="cta">
  <p>
    ¿Necesitas mapas, una plataforma de datos o herramientas a medida?
    Escríbeme a <a href={mailto}>{emailAddress}</a> y cuéntame tu proyecto.
  </p>
</div>
