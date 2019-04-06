import Link from 'next/link';
import './footer.less';
import wildMagiconTransparent from '../assets/images/wild-magicon-transparent.svg';
import moment from 'moment';
import SubscribeForm from './newsletter-subscribe';

function Footer() {
  return (
    <footer className="footer-component">
      <div className="row">
        <div className="grid">
          <div className="col">
            <div>
              <Link href="/">
                <a>
                  <img className="logo" src={wildMagiconTransparent} />
                </a>
              </Link>
            </div>
            <div className="row">
              <div>
                <a
                  href="https://github.com/wild-magic/Wild-Magic.git"
                  target="_blank"
                >
                  Github
                </a>
              </div>
              <div>
                <a href="https://twitter.com/kenny_pizza" target="_blank">
                  twitter
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <h4>Wild Magic.js</h4>
            <ul>
              <li>
                <a
                  href="https://wildmagic.gitbook.io/wildmagic/"
                  target="_blank"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a>Examples</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>About</h4>
            <ul>
              <li>
                <a>What's all this then?</a>
              </li>
              <li>
                <a href="https://wildmagicio.itch.io/" target="_blank">
                  Itch.io
                </a>
              </li>
              <li>
                <a href="maito:wildmagic@kenny.wtf">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>Keep in Touch!</h4>
            <SubscribeForm />
          </div>
        </div>
      </div>
      <div className="row">
        <p className="copyright">
          copyright © {moment().format('YYYY')} Wild Magic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
