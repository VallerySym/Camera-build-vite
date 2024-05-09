import { Link } from 'react-router-dom';
import HeaderLogo from '../header-logo/header-logo';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <HeaderLogo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>
                                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                О компании
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
