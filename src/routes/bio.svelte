<script>
  import Entry from "../components/Entry.svelte";
</script>

<style>
  .description {
    max-width: 800px;
    margin: 0 30px 50px 30px;
  }

  .center-block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: "100%";
    background-color: rgb(240, 237, 220);
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 10px 30px;

    display: flex;
    flex-direction: column;
    align-content: space-between;
  }

  .title {
    margin: 50px 0;
  }
</style>

<svelte:head>
  <title>Bio - Alex Torres</title>
</svelte:head>

<div class="description">
  <h2>Studies</h2>
  <p>
    In my first year of university I really
    <i>hated</i>
    all my programming subjects. Then, I realized that's the thing I most
    enjoyed ever. First we started with C, then Java, then C++, and finally, my
    beloved Javascript. We did a lot of stuff: Games development, web
    development, 3D development (Shaders, WebGL, Modelling...), photography,
    design, video processing, etc.
  </p>
  <p>
    During this years I studied abroad in Ireland, an internship in Germany and
    had one of the best experiences of my life launching a Start-up with some
    good colleagues.
  </p>
  <h2>Work</h2>
  <p>
    My internship at adidas was the first touch with the
    <i>real-life-work®</i>
    , and I really enjoyed it, as I could learn many things that are not taught
    in universities. So just before finishing my studies I got another
    internship to work for some months in my university in a really cool
    project, which finally would be part of my Bachelor's Thesis.
  </p>
  <p>
    Finally I got back to the starting point, getting a
    <i>real-life-job®</i>
    in adidas, where I am growing as a person and engineer day by day.
  </p>
  <p>
    In July 2020 I decided to get out of the comfort zone and try to build some stuff for myself, take some time
    to really know what I really want to do in life.
    Started working as Self Employed in different areas and projects. 
  </p>

  <p>
    In September 2020 me and my partner started building a Van.
  </p>
</div>

<div class="center-block">
  <div class="container">
    <h1 class="title">Résumé</h1>
    <Entry time="2017 - 2020" company="adidas" position="Software Developer">
      <p>
        Creating new digital products employing
        <i>cutting-edge</i>
        technologies. Mostly in the field of web applications and data
        processing.
      </p>

      <ul>
        <li>Kubernetes and Docker, Microservices Architectures</li>
        <li>Typescript, Javascript</li>
        <li>React, Redux</li>
        <li>NodeJS, Express</li>
        <li>Functional Programming</li>
        <li>Serverless / Lambda</li>
        <li>Amazon Web Services</li>
        <li>Kafka</li>
        <li>ElasticSearch</li>
      </ul>
    </Entry>

    <Entry
      time="2017"
      company="University of Alicante"
      position="Software Developer">
      <p>
        Internet of Things project about sending sensors around the university
        of Alicante and collecting diversal data like temperature, light, smoke,
        etc.
        <br />
        <br />
        <a href="/bachelor_thesis.pdf">Download papers (Spanish, 9Mb)</a>
      </p>
    </Entry>

    <Entry
      time="2016"
      company="adidas - Nürnberg, Germany"
      position="Software Developer Internship">
      <p>Internship working mainly as a Frontend Web Developer.</p>
    </Entry>

    <Entry
      time="2012 - 2017"
      company="University of Alicante - Spain"
      position="Bachelor's Degree in Multimedia Engineering">
      <p>
        Studies in the field of computer science. Related to multimedia
        technologies:
      </p>
      <ul>
        <li>Software Design and Development</li>
        <li>Games Development</li>
        <li>3D and image</li>
        <li>Audio</li>
      </ul>
    </Entry>

    <Entry
      time="2015"
      company="Institute of Technology of Sligo - Sligo, Ireland"
      position="BSc in Computing in Games Development">
      <p>
        Studies abroad in Ireland related to web development and games
        development.
      </p>
    </Entry>
  </div>
</div>
