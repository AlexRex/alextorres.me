import"../chunks/Bzak7iHL.js";import"../chunks/CU7fokU3.js";import{at as r,ak as v,am as t,au as f,ar as n,ao as l,av as s,aq as h,as as c}from"../chunks/DdxV4nqT.js";import{h as g}from"../chunks/C19I4dDQ.js";import{s as b}from"../chunks/BUu4j7Up.js";var y=l('<meta name="description" content="Extracción del dominio de alquiler station-based de un monolito Kotlin en producción a sus propios servicios y cuenta de AWS."/> <meta property="og:type" content="website"/> <meta property="og:title" content="Cooltra - dividir una plataforma en producción - Alex Torres"/> <meta property="og:description" content="Extracción del dominio de alquiler station-based de un monolito Kotlin en producción a sus propios servicios y cuenta de AWS."/> <meta property="og:image" content="https://alextorres.me/og/services.png"/> <meta name="twitter:card" content="summary_large_image"/>',1),x=l(`<div class="description svelte-15kukhv"><p><a href="/servicios">← servicios</a> · <a href="/services/cooltra">English</a></p> <h1>Cooltra — dividir una plataforma en producción</h1> <h2>El problema</h2> <p>La plataforma de alquiler de vehículos de Cooltra creció como un único
    sistema sirviendo a dos negocios distintos. El dominio de alquiler
    station-based necesitaba independizarse — su propio repositorio, sus
    propios servicios, su propia cuenta de AWS — sin parar una plataforma que
    opera flotas cada día.</p> <h2>Qué hice</h2> <p>Análisis antes que código. El primer entregable fue un conjunto de
    documentos de arquitectura que mapeaban la plataforma: grafo de módulos,
    fronteras de dominio, librerías compartidas, comunicación en runtime,
    infraestructura AWS y los riesgos de cada corte. Solo entonces empezó la
    extracción, guiada por esas fronteras.</p> <ul><li>Monorepo backend en Kotlin, frontend de operaciones en
    React/TypeScript, frontend de cliente en Next.js, infraestructura en
    Terraform.</li> <li>Análisis de dependencias y acoplamiento para encontrar la frontera de
    extracción con menos riesgos.</li> <li>Extracción incremental: el negocio siguió funcionando sobre el
    monolito mientras los nuevos servicios tomaban el relevo pieza a
    pieza.</li></ul> <h2>El resultado</h2> <p>El dominio station-based funciona como plataforma propia, y el cliente
    conserva un mapa escrito de su arquitectura — útil mucho después de la
    migración.</p></div> <div class="cta svelte-15kukhv"><p>¿Tienes un monolito que necesita desenredarse?
    Escríbeme a <a></a>.</p></div>`,1);function S(d){const p="mailto:hey@alextorres.me?subject=Consulta de proyecto";var e=x();g("15kukhv",m=>{var u=y();s(10),f(()=>{h.title="Cooltra - dividir una plataforma en producción - Alex Torres"}),t(m,u)});var a=r(v(e),2),o=n(a),i=r(n(o));b(i,"href",p),i.textContent="hey@alextorres.me",s(),c(o),c(a),t(d,e)}export{S as component};
