import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/product-process/product-process.selectors';
import Tabs from '../tabs/tabs';

function ProductCard(): JSX.Element {
  const selectedCamera = useAppSelector(getCamera);
  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${selectedCamera?.previewImgWebp}, /${selectedCamera?.previewImgWebp2x}`}
            />
            <img
              src={selectedCamera?.previewImg}
              srcSet={`${selectedCamera?.previewImg2x}`}
              width={560}
              height={480}
              alt={selectedCamera?.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{selectedCamera?.name}</h1>
          <div className="rate product__rate">
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <p className="visually-hidden">Рейтинг: {selectedCamera?.rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>
              {selectedCamera?.reviewCount}
            </p>
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>
            {selectedCamera?.price.toLocaleString()} ₽
          </p>
          <button className="btn btn--purple" type="button">
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <div className="tabs product__tabs" data-testid="tabs-data">
            <Tabs />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
