import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/product-process/product-process.selectors';

function BreadcrumbsList(): JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;
  const selectedCamera = useAppSelector(getCamera);

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs-list">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link
              className="breadcrumbs__link"
              to={`${AppRoute.Catalog}?page=1`}
            >
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link
              className={`breadcrumbs__link breadcrumbs__link${pathname === AppRoute.Catalog ? '--active' : ''}`}
              to={AppRoute.Catalog}
            >
              Каталог
              {pathname !== AppRoute.Catalog &&
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>}
            </Link>
          </li>
          {pathname.includes(AppRoute.Camera) &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {selectedCamera?.name}
              </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}


export default BreadcrumbsList;

