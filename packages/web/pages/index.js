import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import './index.less';
import SubscribeForm from '../components/newsletter-subscribe';

const heroStyle = {
  textAlign: 'center',
  height: '60vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
};

const linksStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
};

function Index() {
  return (
    <main>
      <div className="row">
        <div style={heroStyle}>
          <h1 className="hero">Wild Magic</h1>
          <p>Games, but like for 2019</p>
          <div style={linksStyle}>
            <Link href="/game-engine">
              <a>Game Engine (1.0.0-alpha.13)</a>
            </Link>
            <a href="https://dungeon.wildmagic.io" target="_blank">
              Dungeoneering Demo (1.0.0-alpha.10)
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Index;
