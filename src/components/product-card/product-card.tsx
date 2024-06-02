import { stars } from '../../const';
import Tabs from '../tabs/tabs';
import { CameraItem } from '../../types/camera-item';

type ProductCardProps ={
  selectedCamera: CameraItem | null;
}

function ProductCard({selectedCamera}:ProductCardProps): JSX.Element {

  return (
    <section className="product" data-testid="product-card">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${String(selectedCamera?.previewImgWebp)}, /${String(selectedCamera?.previewImgWebp2x)}`}
            />
            <img
              src={selectedCamera?.previewImg}
              srcSet={`${String(selectedCamera?.previewImg2x)}`}
              width={560}
              height={480}
              alt={selectedCamera?.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{selectedCamera?.name}</h1>
          <div className="rate product__rate">
            {stars.map((star) => (
              <svg key={star} width={17} height={16} aria-hidden="true">
                {star <= Math.floor(Number(selectedCamera?.rating)) ? (
                  <use xlinkHref="#icon-full-star" />
                ) : (
                  <use xlinkHref="#icon-star" />
                )}
              </svg>
            ))}
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
            <Tabs selectedCamera={selectedCamera} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
