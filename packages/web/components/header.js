import './header-component.less';
import Link from 'next/link';

function Header() {
  return (
    <header className="header-component">
      <Link href="/">
        <a>
          <h1 className="title">Wild Magic</h1>
        </a>
      </Link>
    </header>
  );
}

export default Header;
