import Meta from '../components/meta';
import Header from './header';
import Footer from './footer';

export default ({ children }: { children: any }) => (
  <div className="layout">
    <Meta />
    <div className="content">
      <Header />
      {children}   
    </div>
    <Footer />       

    <style jsx>{`
      .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100vw;
        
        .content {
          flex: 1;
        }
      }
    `}</style>
  </div>
);
