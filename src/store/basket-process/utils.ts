import { CouponType } from '../../const';
import { Basket } from '../../types/state';

export const getBasketListFromLS = () => {
  const data = localStorage.getItem('basket');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const items = data ? JSON.parse(data) : [];
  return {
    items: items as Basket[]
  };
};

export const getPromoCodeLS = () => {
  const data = localStorage.getItem('promo');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promo = data ? JSON.parse(data) : null;
  return {
    promo: promo as CouponType
  };
};

export const getDiscountLS = () => {
  const data = localStorage.getItem('discount');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promoDiscount = data ? JSON.parse(data) : 0;
  return {
    promoDiscount: promoDiscount as number
  };
};

export const calcTotalPrice = (items: Basket[]) => items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
