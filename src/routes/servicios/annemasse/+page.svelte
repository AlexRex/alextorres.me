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
  <title>Annemasse Agglo - mapa geográfico de transporte - Alex Torres</title>
  <meta
    name="description"
    content="Mapa geográfico interactivo de una red de transporte con teselas vectoriales auto-hospedadas: MapLibre + PMTiles, sin proveedor de mapas de terceros." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Annemasse Agglo - mapa geográfico de transporte - Alex Torres" />
  <meta property="og:description" content="Mapa geográfico interactivo de una red de transporte con teselas vectoriales auto-hospedadas: MapLibre + PMTiles, sin proveedor de mapas de terceros." />
  <meta property="og:image" content="https://alextorres.me/og/annemasse.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="description">
  <p><a href="/servicios">← servicios</a> · <a href="/services/annemasse">English</a></p>

  <h1>Annemasse Agglo: mapa geográfico de transporte</h1>

  <h2>El problema</h2>
  <p>
    La red de transporte de la aglomeración de Annemasse necesitaba un mapa
    geográfico interactivo de sus líneas y paradas. Las opciones habituales,
    Google Maps o Mapbox, implican una factura por petición que crece con el
    tráfico y una dependencia dura de un proveedor externo.
  </p>

  <h2>Qué construí</h2>
  <p>
    Un mapa dueño de toda su pila. El basemap es un extracto de teselas
    vectoriales de la región (PMTiles, generado a partir de datos de
    Protomaps) servido como un único fichero estático: sin servidor de
    teselas, sin claves de API, sin cuotas de uso. Encima, MapLibre renderiza
    la red: líneas y paradas superpuestas como SVG, interactivas y con la
    imagen de marca del operador.
  </p>
  <ul>
    <li>MapLibre GL para el renderizado, PMTiles/Protomaps para el basemap.</li>
    <li>El mapa entero se despliega como ficheros estáticos, así que puede
    alojarse en cualquier sitio, incluido un CDN, por céntimos.</li>
    <li>Un modo de edición para que el operador ajuste los valores por
    defecto del mapa, excluido del build de producción.</li>
  </ul>

  <h2>El resultado</h2>
  <p>
    Un mapa rápido, interactivo y adaptado a la marca, con cero costes
    recurrentes de proveedor de mapas.
  </p>

  <h2>Pruébalo</h2>
  <p>
    Aquí tienes el mapa. También puedes
    <a href="https://test-annemasse-interactif.geotoni.fr" rel="noopener">
      abrirlo a pantalla completa</a>.
    Diseño gráfico del mapa por
    <a href="https://geotoni.eu" rel="noopener">Toni</a>.
  </p>
</div>

<iframe
  class="map-embed"
  src="https://test-annemasse-interactif.geotoni.fr"
  title="Mapa interactivo de transporte de Annemasse Agglo"
  loading="lazy"></iframe>

<div class="cta">
  <p>
    ¿Pagas demasiado por tus mapas, o sigues con el plano de red en PDF?
    Escríbeme a <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
