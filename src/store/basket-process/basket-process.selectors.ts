import { CouponType, NameSpace, RequestStatus } from '../../const';
import { State } from '../../types/state';

export const getBasketItems = (state: Pick<State, NameSpace.Basket>) =>
  state[NameSpace.Basket].items;

export const getDiscount = (state: Pick<State, NameSpace.Basket>): number =>
  state[NameSpace.Basket].discount;

export const getErrorStatus = (state: Pick<State, NameSpace.Basket>): boolean =>
  state[NameSpace.Basket].hasError;

export const getPostOrderStatus = (state: Pick<State, NameSpace.Basket>): RequestStatus =>
  state[NameSpace.Basket].basketStatus;

export const getPromoCodeName = (state: Pick<State, NameSpace.Basket>): CouponType | null =>
  state[NameSpace.Basket].promoCode;

export const isPromoValid = (state: Pick<State, NameSpace.Basket>): boolean =>
  state[NameSpace.Basket].isPromoCodeValid;

export const getDiscountPercent = (state: Pick<State, NameSpace.Basket>): number =>
  state[NameSpace.Basket].discountPercent;
