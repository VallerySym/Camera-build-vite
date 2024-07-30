import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import SearchForm from '../search-form/search-form';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket-process/basket-process.selectors';

function Header(): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  const quantityItems = basketItems.reduce((sum, item) => item.count + sum, 0);

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          className="header__logo"
          aria-label="Переход на главную"
          to={AppRoute.Catalog}
        >
          <span className='visually-hidden'>Переход на главную</span>
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
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
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket} data-testid='header-basket'>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketItems.length > 0 && <span className="header__basket-count">{quantityItems}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
