import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketProcess } from '../../types/state';
import { CouponType, NameSpace, RequestStatus } from '../../const';
import { getBasketListFromLS, getDiscountLS, getPromoCodeLS } from './utils';
import { postOrder } from '../api-actions';
import { toast } from 'react-toastify';
import { CameraItem } from '../../types/camera-item';

const { items } = getBasketListFromLS();
const { promo } = getPromoCodeLS();
const { promoDiscount } = getDiscountLS();

const initialState: BasketProcess = {
  items: items,
  discount: promoDiscount,
  promoCode: promo,
  hasError: false,
  isPromoCodeValid: false,
  basketStatus: RequestStatus.Idle,
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CameraItem>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
        );
      }
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    plusCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    minusCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, count: item.count - 1 } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    deleteAllItems: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    setCountItem: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, count: action.payload.count } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    setPromoCode: (state, action: PayloadAction<CouponType>) => {
      state.promoCode = action.payload;
    },
    resetBasket: (state) => {
      state.items = [];
      localStorage.removeItem('basket');
      state.discount = 0;
      state.hasError = false;
      state.basketStatus = RequestStatus.Idle;
      localStorage.removeItem('promo');
      localStorage.removeItem('discount');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.basketStatus = RequestStatus.Loading;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.basketStatus = RequestStatus.Success;
        toast.warn('Ваш заказ успешно отправлен!');
      })
      .addCase(postOrder.rejected, (state) => {
        state.basketStatus = RequestStatus.Error;
        toast.warn('Произошла ошибка отправки заказа. Попробуйте позже');
      });
  }
});

export const { addItem, setCountItem, plusCountItem, minusCountItem, deleteAllItems, resetBasket, setPromoCode } = basketSlice.actions;
