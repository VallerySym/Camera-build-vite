import { useAppSelector } from "../../hooks";
import { getCamera } from "../../store/product-process/product-process.selectors";

function ProductCard():JSX.Element{
  const selectedCamera = useAppSelector(getCamera);

  return(
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${selectedCamera?.previewImgWebp}, ${selectedCamera?.previewImgWebp2x}`}
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
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control" type="button">
                  Характеристики
              </button>
              <button className="tabs__control is-active" type="button">
                  Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {selectedCamera?.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{selectedCamera?.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{selectedCamera?.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{selectedCamera?.level}</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                {selectedCamera?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
