import Link from '../components/backgroundLink';

const emailAddress = 'alejandro.torres.mateu@gmail.com';
const emailSubject = 'Hey Alex! 🥝'
const emailBody = 'Hi Alex, I am {YOUR_NAME}, I want to talk to you about [...].'

const mailto = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

export default () => (
  <nav>
    <div className="name">
      <h1>
        <Link linkTo='/' color='rgba(166, 186, 61, 0.5)'>alex torres</Link>
      </h1>
    </div>
    <div className="links">
      <h2>
        <Link linkTo='/bio' color='rgba(254, 101, 1, 0.7)'>bio</Link>
      </h2>
      <h2>
        <Link linkTo={mailto} color='rgba(174, 204, 199, 1)'>contact</Link>
      </h2>
    </div>

    <style jsx>{`
      $font-size: 14px;

      nav {
        display: flex;
        padding: 30px;
        
        .name {
          flex: 1;
          font-size: $font-size;
        }

        .links {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          font-size: $font-size;

          h2 {
            padding: 0 20px 0 0;
          }
        }
      }
    `}
    </style>
  </nav>
);
