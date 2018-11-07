import { ReactNode } from 'react';
import Link from 'next/link';

interface ILink {
  children: ReactNode;
  linkTo: string;
  color?: string;
}

export default ({ linkTo, children, color }: ILink) => (
  <Link href={linkTo}>
    <a>
      {children}

      <style jsx>{`
      a {
        text-decoration: none;
        color: inherit;
        position: relative;

        &:before {
          content: "${children}";
          color: rgba(0,0,0,0);
          position: absolute;
          bottom: -10px;
          z-index: -1;
          height: 50%;
          background-color: ${color};
          opacity: 0;
          transform: skew(-10deg);
        }

        &:hover {
          &:before {
            bottom: 0px;
            transition: 250ms ease-in;
            opacity: 1;
          }
        }
      }
    `}</style>
    </a>
  </Link>
);
