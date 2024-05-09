import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { errorMessageSlice } from './error-message-process/error-message-process.slice';
import { catalogSlice } from './catalog-process/catalog-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Error]: errorMessageSlice.reducer,
  [NameSpace.Catalog]: catalogSlice.reducer,
});
