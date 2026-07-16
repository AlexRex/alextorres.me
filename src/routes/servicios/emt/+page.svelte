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

  .poster {
    width: 100%;
    border: 1px solid rgb(240, 237, 220);
  }
</style>

<svelte:head>
  <title>EMT - mapa de red e infografías impresas - Alex Torres</title>
  <meta
    name="description"
    content="Una librería de mapa de red embebible y un sistema de PDF basado en navegador que imprime las infografías de las paradas de autobús reales." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="EMT - mapa de red e infografías impresas - Alex Torres" />
  <meta property="og:description" content="Una librería de mapa de red embebible y un sistema de PDF basado en navegador que imprime las infografías de las paradas de autobús reales." />
  <meta property="og:image" content="https://alextorres.me/og/emt.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="description">
  <p><a href="/servicios">← servicios</a> · <a href="/services/emt">English</a></p>

  <h1>EMT: mapa de red e infografías impresas</h1>

  <h2>El problema</h2>
  <p>
    Un operador público de autobuses necesita que su red se entienda en dos
    sitios muy distintos: en la web, donde los viajeros exploran líneas y
    paradas de forma interactiva, y en la calle, donde cada parada y poste
    lleva infografías impresas que deben mantenerse sincronizadas con la red
    real.
  </p>

  <h2>Qué construí</h2>
  <p>
    Dos sistemas conectados que comparten los mismos datos de red:
  </p>
  <ul>
    <li>
      <b>Una librería de mapa embebible:</b> una librería JavaScript (bundle
      de un solo fichero, API en JS plano) que cualquier web del operador
      puede incorporar para renderizar el mapa interactivo de líneas y
      paradas.
    </li>
    <li>
      <b>Un motor de infografías:</b> el navegador como motor de
      maquetación: un sistema de diseño por slots compone la infografía de
      cada parada y poste, y una API la renderiza a PDF listo para imprimir.
      Cuando la red cambia, el material impreso se regenera en lugar de
      redibujarse a mano.
    </li>
  </ul>

  <h2>El resultado</h2>
  <p>
    Las infografías generadas por este sistema están impresas e instaladas en
    paradas de autobús reales, y la misma fuente de verdad alimenta el mapa
    interactivo, así que la web y la calle nunca se contradicen.
  </p>
  <p>
    Un ejemplo real, generado por el sistema para una marquesina
    (<a href="/emt-marquesina.pdf" rel="noopener">abre el PDF completo</a>):
  </p>
  <a href="/emt-marquesina.pdf" rel="noopener">
    <img
      class="poster"
      src="/emt-marquesina.png"
      alt="Infografía de marquesina de la parada 2417: termómetros de las líneas 4, 19, 20 y N3, tarifas y leyenda" />
  </a>

  <h2>Pruébalo</h2>
  <p>
    Aquí tienes el mapa esquemático de la red. También puedes
    <a href="https://bus-map.alextorres.me" rel="noopener">abrirlo a pantalla completa</a>.
    Diseño gráfico del mapa por
    <a href="https://geotoni.eu" rel="noopener">Toni</a>.
  </p>
</div>

<iframe
  class="map-embed"
  src="https://bus-map.alextorres.me"
  title="Mapa interactivo de la red de la EMT"
  loading="lazy"></iframe>

<div class="description">
  <p>
    La misma aproximación impulsa el mapa de red de
    <a href="https://castello-map.alextorres.me" rel="noopener">Castelló</a>.
  </p>
</div>

<div class="cta">
  <p>
    ¿Necesitas convertir los datos de tu red en mapas o en material impreso?
    Escríbeme a <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
