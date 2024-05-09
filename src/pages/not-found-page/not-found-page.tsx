import { Link } from 'react-router-dom';
import HeaderLogo from '../../components/header-logo/header-logo';

const container = {
  padding: 50,
};

function NotFoundPage(): JSX.Element {
  return (
    <div style={container}>
      <HeaderLogo />
      <h2>404 Page not found</h2>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
}

export default NotFoundPage;
