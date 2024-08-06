import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { minusCountItem, plusCountItem, setCountItem } from '../../store/basket-process/basket-process.slice';
import { CameraItem } from '../../types/camera-item';
import { MAX_QUANTITY_BASKET_ITEMS, MIN_QUANTITY_BASKET_ITEMS } from '../../const';
import { Basket } from '../../types/basket';
import { openDeleteItemPopup } from '../../store/popup-process/popup-process.slice';

type BasketItemProps = {
  item: Basket;
  setCamera: (arg: CameraItem) => void;
}

function BasketItem({ item, setCamera }: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);

  const handleBasketItemDelete = () => {
    setCamera(item);
    dispatch(openDeleteItemPopup());
  };

  const handlePlusItem = () => {
    dispatch(plusCountItem(item.id));
  };

  const handleMinusItem = () => {
    dispatch(minusCountItem(item.id));
  };

  const handleInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value > MAX_QUANTITY_BASKET_ITEMS) {
      dispatch(setCountItem({ id: item.id, count: MAX_QUANTITY_BASKET_ITEMS }));
      return;
    }

    dispatch(setCountItem({ id: item.id, count: Math.round(+value) }));
  };

  const handleInputValueBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value < MIN_QUANTITY_BASKET_ITEMS) {
      dispatch(setCountItem({ id: item.id, count: MIN_QUANTITY_BASKET_ITEMS }));
    }
  };

  const handleEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { target } = evt;
    if (evt.key === 'Enter' && target instanceof HTMLInputElement && ref.current) {
      ref.current.blur();
    }
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${String(item.previewImgWebp)}, /${String(item.previewImgWebp2x)}`}
          />
          <img
            src={item.previewImg}
            srcSet={item.previewImg2x}
            width="140"
            height="120"
            alt={`Фотоаппарат ${item.name}`}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{item.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{item.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{item.type} фотокамера</li>
          <li className="basket-item__list-item">{item.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{item.price.toLocaleString()} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleMinusItem}
          disabled={item.count <= MIN_QUANTITY_BASKET_ITEMS}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          min="1"
          max="9"
          aria-label="количество товара"
          ref={ref}
          onChange={handleInputValueChange}
          onBlur={handleInputValueBlur}
          value={item.count || ''}
          onKeyDown={handleEnterClick}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handlePlusItem}
          disabled={item.count === MAX_QUANTITY_BASKET_ITEMS}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(item.price * item.count).toLocaleString()} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleBasketItemDelete}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
