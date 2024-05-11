import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { errorMessageSlice } from './error-message-process/error-message-process.slice';
import { catalogSlice } from './catalog-process/catalog-process.slice';
import { productSlice } from './product-process/product-process.slice';
import { reviewsSlice } from './reviews-process/reviews-process.slice';
import { popupSlice } from './popup-process/popup-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Error]: errorMessageSlice.reducer,
  [NameSpace.Cameras]: catalogSlice.reducer,
  [NameSpace.Camera]: productSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.Popup]: popupSlice.reducer,
});
