import Head from 'next/head';
export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Alex Torres</title>
      <meta name="description" content="I am a passionated software engineer focused on web technologies, coding and visual stuff. Currently working at adidas, crafting new digital products."></meta>
      <link href="https://fonts.googleapis.com/css?family=Space+Mono|Work+Sans:300,400" rel="stylesheet"></link>
      <link rel="icon" href="/static/favicon.ico"/>
    </Head>
    <style jsx global>{`
      body, html { 
        font-family: 'Space Mono', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100%;
        width: 100%;
        margin: 0;
        font-size: 15px;
      }

      h1, h2, h3 {
        font-family: 'Work Sans', monospace;
      }
    `}</style>
  </div>
);
