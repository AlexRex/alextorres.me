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
  <title>Bicielx - ¿dónde debería ir la próxima estación? - Alex Torres</title>
  <meta
    name="description"
    content="Análisis geoespacial de cobertura de una red de bicicleta pública: mapa de calor de déficit, población censal al alcance y una propuesta de estación respaldada por datos." />
</svelte:head>

<div class="description">
  <p><a href="/servicios">← servicios</a> · <a href="/services/bicielx">English</a></p>

  <h1>Bicielx — ¿dónde debería ir la próxima estación?</h1>

  <h2>El problema</h2>
  <p>
    Bicielx es la red de bicicleta pública de Elche: 110 estaciones. Decidir
    dónde va la siguiente suele discutirse con opiniones. Yo quería
    discutirlo con datos — así que construí el análisis por mi cuenta y envié
    la propuesta al operador. Iniciativa propia, nadie lo pidió.
  </p>

  <h2>Qué hice</h2>
  <ul>
    <li>Un mapa de calor de déficit de cobertura de toda el área servida: a
    qué distancia está cada punto de su estación más cercana, revelando los
    huecos de la red.</li>
    <li>Población al alcance del punto propuesto, calculada con datos
    censales oficiales (INE, a nivel de sección censal con interpolación
    areal) en lugar de medias de densidad burdas — que resultaron
    sobreestimar 7×.</li>
    <li>Metodología honesta, limitaciones declaradas y la afirmación
    defendible: el punto propuesto está en el ~1% peor cubierto del área
    servida, el hueco más claro del flanco sur de la red.</li>
    <li>Entregables que el operador puede usar de verdad: un mapa interactivo
    y un PDF de dos páginas listo para imprimir.</li>
  </ul>

  <h2>El resultado</h2>
  <p>
    Una propuesta respaldada por datos para una nueva estación concreta,
    enviada al operador municipal.
  </p>

  <h2>Pruébalo</h2>
  <p>
    El análisis de cobertura, en vivo — o
    <a href="https://analisis-bicielx.alextorres.me" rel="noopener">
      ábrelo a pantalla completa</a>.
  </p>
</div>

<iframe
  class="map-embed"
  src="https://analisis-bicielx.alextorres.me"
  title="Análisis de cobertura de Bicielx"
  loading="lazy"></iframe>

<div class="cta">
  <p>
    ¿Planificas dónde crecer una red — estaciones, paradas, áreas de
    servicio? Escríbeme a <a href={mailto}>{emailAddress}</a>.
  </p>
</div>
