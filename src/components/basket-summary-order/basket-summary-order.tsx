import { CouponType, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCoupon, postOrder } from '../../store/api-actions';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getBasketItems, getDiscount, getErrorStatus, getPostOrderStatus, getPromoCodeName, isPromoValid } from '../../store/basket-process/basket-process.selectors';
import { resetBasket, setPromoCode } from '../../store/basket-process/basket-process.slice';
import { openOrderSuccessPopup } from '../../store/popup-process/popup-process.slice';
import { checkOrderSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';
import PopupOrderSuccess from '../popup-order-success/popup-order-success';
import { getDiscountByQuantity, getDiscountByTotalPrice } from './utils';

type BasketSummaryOrderProps = {
  totalPrice: number;
  orderIds: number[];
  isBasketEmpty: boolean;
}

function BasketSummaryOrder({ totalPrice, orderIds, isBasketEmpty }: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const postOrderStatus = useAppSelector(getPostOrderStatus);

  const promoCode = useAppSelector(getPromoCodeName);
  const [promoText, setPromoText] = useState<CouponType | null>(promoCode);
  const isError = useAppSelector(getErrorStatus);
  const isValid = useAppSelector(isPromoValid);

  const basketItems = useAppSelector(getBasketItems);
  const basketItemsQnt = basketItems.reduce((sum, item) => item.count + sum, 0);

  const discountPromo = useAppSelector(getDiscount);

  const discountPercentByQnt = getDiscountByQuantity(basketItemsQnt);
  const discountPercentByTotalPrice = getDiscountByTotalPrice(totalPrice, discountPercentByQnt);

  const discountWithPercent = Math.round(totalPrice * discountPercentByTotalPrice / 100);
  const discountWithPromo = Math.round((totalPrice - discountWithPercent) * discountPromo / 100);

  const totalDiscountSumm = discountWithPromo + discountWithPercent;
  const priceWithDiscount = Math.round(totalPrice - totalDiscountSumm);

  const isOrderSuccessPopupOpen = useAppSelector(checkOrderSuccessPopupOpen);

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { value } = evt.target;
    setPromoText(value as CouponType);
  };

  const handleOrderSend = () => {
    dispatch(postOrder({ camerasIds: orderIds, coupon: promoCode }));
    dispatch(openOrderSuccessPopup());
  };

  useEffect(() => {
    if (postOrderStatus === RequestStatus.Success) {
      dispatch(resetBasket());
    }
  }, [dispatch, postOrderStatus]);

  const handlePromoCodeEnter = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (promoText && promoText.length > 0) {
      dispatch(postCoupon(promoText));
      dispatch(setPromoCode(promoText));
    }
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле </p>
        <div className="basket-form">
          <form action="#" onSubmit={handlePromoCodeEnter}>
            <div className={classNames({ 'is-invalid': isError, 'is-valid': isValid || discountPromo > 0 }, 'custom-input')}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод"
                  onChange={handleFormChange}
                  defaultValue={promoText || ''}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {totalPrice.toLocaleString()} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={classNames({ 'basket__summary-value--bonus': totalDiscountSumm > 0 }, 'basket__summary-value')}>
            {totalDiscountSumm.toLocaleString()} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">
            {priceWithDiscount.toLocaleString()} ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={handleOrderSend}
          disabled={postOrderStatus === RequestStatus.Loading || isBasketEmpty}
        >
          Оформить заказ
        </button>
      </div>
      {isOrderSuccessPopupOpen && <PopupOrderSuccess />}
    </div>
  );
}

export default BasketSummaryOrder;
