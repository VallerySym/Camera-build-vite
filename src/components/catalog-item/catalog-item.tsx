import { CameraItem } from "../../types/camera-item";

type CatalogItemProps = {
  catalogItem: CameraItem;
}

function CatalogItem({ catalogItem }: CatalogItemProps): JSX.Element {

  return (
    <div className="product-card">
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
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <p className="visually-hidden">Рейтинг: {catalogItem.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{catalogItem.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {catalogItem.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{catalogItem.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}

export default CatalogItem;
