import './subscribe.less';

function Subscribe() {
  return (
    <footer className="footer-component">
      <div className="row">
        <div className="grid">
          <div>
            <img className="logo" src={wildMagiconTransparent} />
            <p>copyright © 2019 Wild Magic. All rights reserved.</p>
          </div>
          <div>
            wildmagic{' '}
            <a href="https://twitter.com/kenny_pizza" target="_blank">
              @kenny.wtf
            </a>{' '}
            2019
          </div>
          <div>
            <a
              href="https://github.com/wild-magic/Wild-Magic.git"
              target="_blank"
            >
              github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Subscribe;
