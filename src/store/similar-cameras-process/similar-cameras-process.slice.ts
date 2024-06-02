import { createSlice } from '@reduxjs/toolkit';
import { SimilarCamerasProcess } from '../../types/state';
import { fetchCameras } from '../api-actions';
import { NameSpace } from '../../const';

const initialState: SimilarCamerasProcess = {
  similarCameras: [],
  similarCameraIsLoading: false,
  similarCameraIsNotFound: false,
};

export const similarCamerasSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.similarCameraIsLoading = true;
        state.similarCameraIsNotFound = false;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.similarCameraIsLoading = false;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.similarCameraIsLoading = false;
        state.similarCameraIsNotFound = true;
      });

  },
});
