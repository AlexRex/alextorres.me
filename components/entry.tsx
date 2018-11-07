import { ReactNode } from 'react';

export interface IEntry {
  time: string;
  position: string;
  company: string;
  children: ReactNode;
}
export default({ time, position, company, children }: IEntry) => (
  <div className="entry">
    <div className="time">{time}</div>
    <div className="description">
      <h2 className="position">{position}</h2>
      <h3 className="company">{company}</h3>
      {children}
    </div>

    <style jsx>{`
      .entry {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;

        @media(max-width: 620px) {
          flex-direction: column;
        }

        h2, h3 {
          margin: 0;
        }

        .time {
          display: flex;
          flex: 1;
        }

        .description {
          flex: 3;

          .company {
            font-weight: 400;
          }
        }
      }
    `}</style>
  </div>
)
