import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { catalogSlice } from './catalog-process/catalog-process.slice';
import { productSlice } from './product-process/product-process.slice';
import { reviewsSlice } from './reviews-process/reviews-process.slice';
import { popupSlice } from './popup-process/popup-process.slice';
import { promoSlice } from './promo-process/promo-process.slice';
import { similarCamerasSlice } from './similar-cameras-process/similar-cameras-process.slice';
import { basketSlice } from './basket-process/basket-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: catalogSlice.reducer,
  [NameSpace.Camera]: productSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.Popup]: popupSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Similar]: similarCamerasSlice.reducer,
  [NameSpace.Basket]: basketSlice.reducer,
});
