import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function HeaderLogo(): JSX.Element {
  return (
    <Link
      className="header__logo"
      aria-label="Переход на главную"
      to={AppRoute.Catalog}
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref="#icon-logo" />
      </svg>
    </Link>

  );
}

export default HeaderLogo;
