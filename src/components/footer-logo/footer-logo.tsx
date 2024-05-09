import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function FooterLogo(): JSX.Element {
  return (
    <Link
      className="footer__logo"
      aria-label="Переход на главную"
      to={AppRoute.Catalog}
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref="#icon-logo-mono" />
      </svg>
    </Link>
  );
}

export default FooterLogo;
