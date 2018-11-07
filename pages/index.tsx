import Page from '../layout/main';
import CenterBlock from '../components/centerblock';
import Link from '../components/backgroundLink';

export default () => (
  <Page>
    <CenterBlock height='calc(100vh - 200px)'>
      <div className="container">
        <p>
          I am a passionated software engineer focused on web technologies, coding and visual stuff. <br />
          Currently working at adidas, crafting new digital products.
        </p>
        <p>
          In my spare time I love bikes [🚲] and mountains [⛰].
        </p>
        <p>
          You can find me in <Link linkTo='https://www.linkedin.com/in/alejandrotorresmateu/' color='rgba(0, 119, 181, .5)'>LinkedIn</Link>, <Link linkTo='https://github.com/AlexRex' color='rgba(36, 41, 45, .5)'>Github</Link> and <Link linkTo='https://medium.com/@aaaaalextorres' color='rgba(20, 142, 106, .3)'>Medium</Link>.
        </p>
      </div>
    </CenterBlock>
    
    <style jsx>{`
      .container {
        max-width: 800px;
        margin: 0 30px;

        p {
          font-size: 24px;

          @media(max-width: 600px) {
            font-size: 20px;
          }
        }
      }
    `}</style>
  </Page>
);
