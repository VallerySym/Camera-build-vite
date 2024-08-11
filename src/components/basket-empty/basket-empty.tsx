import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './basket-empty.css';

function BasketEmpty(): JSX.Element {
  return (
    <>
      <div className="basket-item__title">Корзина пуста</div>
      <Link className= "btn btn--purple product-card__btn margin " to={AppRoute.Catalog}>
        За покупками
      </Link>
    </>
  );
}

export default BasketEmpty;
