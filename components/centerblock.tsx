import { ReactNode } from 'react';

export interface ICenterBlock {
  children: ReactNode;
  height?: string;
  color?: string;
}
export default ({ children, height, color }: ICenterBlock) => (
  <div className='wrapper'>
    {children}

    <style jsx>{`
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: ${height || '100%'};
        background-color: ${color || 'transparent'};
      }
    `}</style>
  </div>
);
