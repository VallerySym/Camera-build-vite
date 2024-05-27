import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const container = {
  padding: 50,
};

function NotFoundPage(): JSX.Element {
  return (
    <div style={container}>
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
      <h2>404 Page not found</h2>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
}

export default NotFoundPage;
