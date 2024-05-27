import { createSlice } from '@reduxjs/toolkit';
import { PromoProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromos } from '../api-actions';

const initialState: PromoProcess = {
  promoCameras:[],
  promoCamerasIsLoading: false,
  promoCamerasIsNotFound: false,
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.promoCamerasIsLoading = true;
        state.promoCamerasIsNotFound = false;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.promoCameras = action.payload;
        state.promoCamerasIsLoading = false;
      })

      .addCase(fetchPromos.rejected, (state) => {
        state.promoCamerasIsLoading = false;
        state.promoCamerasIsNotFound = true;
      });
  }
});
