import { createSlice } from '@reduxjs/toolkit';
import { CameraProcess } from '../../types/state';
import { fetchCamera } from '../api-actions';
import { NameSpace } from '../../const';

const initialState: CameraProcess = {
  camera: null,
  cameraIsLoading: false,
  cameraIsNotFound: false,
};

export const productSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchCamera.pending, (state) => {
        state.cameraIsLoading = true;
        state.cameraIsNotFound = false;
      })
      .addCase(fetchCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.cameraIsLoading = false;
      })

      .addCase(fetchCamera.rejected, (state) => {
        state.cameraIsLoading = false;
        state.cameraIsNotFound = true;
      });

  },
});
