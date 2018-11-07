import Page from '../layout/main';
import CenterBlock from '../components/centerblock';
import Entry from '../components/entry';

export default () => (
  <Page>
    <div className="description">
      <h2>
        Studies
      </h2>
      <p>
        In my first year of university I really <i>hated</i> all my programming subjects. Then, I realized that's the thing I most enjoyed
        ever. First we started with C, then Java, then C++, and finally, my beloved Javascript. We did a lot of stuff: 
        Games development, web development, 3D development (Shaders, WebGL, Modelling...), photography, design, video processing, etc.
      </p>
      <p>
        During this years I studied abroad in Ireland, an internship in Germany and had one of the best experiences of my life launching a Start-up with some good colleagues.
      </p>
      <h2>
        Work
      </h2>
      <p>
        My internship was the first touch with the <i>real-life-work®</i>, and I really enjoyed it, as I could learn many things that are not taught in universities. 
        So just before finishing my studies I got another internship to work for some months in my university in a really cool project, which finally would be part of my Bachelor's Thesis.
      </p>
      <p>
        This project was related to IoT stuff. I developed a platform (backend, frontend and hardware) to control a series of smart devices spread across the campus with sensors attached. 
        This platform would gather all this data and send it to a third party service inside the university. 
      </p>
      <p>
        Finally I got back to the starting point, getting a <i>real-life-job®</i> in adidas, where I am growing as a person and engineer day by day.
      </p>
    </div>
    <CenterBlock color='rgb(240, 237, 220)'>
      <div className="container">
        <h1 className="title">Résumé</h1>
        <Entry time="2017 - Now" company="adidas" position="Software Developer">
          <p>
            Creating new digital products employing <i>cutting-edge</i> technologies.
          </p>
        </Entry>

        <Entry time="2017" company="University of Alicante" position="Software Developer">
          <p>
            Internet of Things project about sending sensors around the university of Alicante and 
            collecting diversal data like temperature, light, smoke, etc.
            <br/>
            <br/>
            <a href="/static/bachelor_thesis.pdf">Download papers (Spanish)</a>
          </p>
        </Entry>

        <Entry time="2016" company="adidas - Nürnberg, Germany" position="Software Developer Internship">
          <p>
            Internship working mainly as a Frontend Web Developer.
          </p>
        </Entry>

        <Entry time="2012 - 2017" company="University of Alicante - Spain" position="Bachelor's Degree in Multimedia Engineering">
          <p>
            Studies in the field of computer science. Related to multimedia technologies:
          </p>
          <ul>
            <li>Software Design and Development</li>
            <li>Games Development</li>
            <li>3D and image</li>
            <li>Audio</li>
          </ul>
        </Entry>

        <Entry time="2015" company="Institute of Technology of Sligo - Sligo, Ireland" position="BSc in Computing in Games Development">
          <p>
            Studies abroad in Ireland related to web development and games development.
          </p>
        </Entry>
      </div>
    </CenterBlock>

    <style jsx>{`
      .description {
        max-width: 800px;
        margin: 0 30px 50px 30px;
      }
      .container {
        max-width: 800px;
        width: 100%;
        margin: 10px 30px;

        display: flex;
        flex-direction: column;
        align-content: space-between;

        .title {
          margin: 50px 0;
        }
      }
    `}</style>
  </Page>
);
