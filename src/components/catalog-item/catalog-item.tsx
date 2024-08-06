import { Link } from 'react-router-dom';
import { CameraItem } from '../../types/camera-item';
import { AppRoute, stars } from '../../const';
import { fetchCamera } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openAddItemPopup } from '../../store/popup-process/popup-process.slice';
import { getBasketItems } from '../../store/basket-process/basket-process.selectors';

type CatalogItemProps = {
  catalogItem: CameraItem;
}

function CatalogItem({ catalogItem }: CatalogItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const basketItemList = useAppSelector(getBasketItems);
  const itemInBasket = basketItemList.find((item) => item.id === catalogItem.id);

  return (
    <div className="product-card" data-testid="camera-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${catalogItem.previewImgWebp}, ${catalogItem.previewImgWebp2x}`}
          />
          <img
            src={catalogItem.previewImg}
            srcSet={`${catalogItem.previewImg2x}`}
            width={280}
            height={240}
            alt={catalogItem.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {stars.map((star) => (
            <svg key={star} width={17} height={16} aria-hidden="true">
              {star <= Math.floor(catalogItem.rating) ? (
                <use xlinkHref="#icon-full-star" />
              ) : (
                <use xlinkHref="#icon-star" />
              )}
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {catalogItem.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{catalogItem.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {catalogItem.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{catalogItem.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {itemInBasket !== undefined ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              dispatch(fetchCamera(Number(catalogItem.id)));
              dispatch(openAddItemPopup());
            }}
          >
            Купить
          </button>}
        <Link
          className="btn btn--transparent"
          to={`/camera/${catalogItem.id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CatalogItem;
