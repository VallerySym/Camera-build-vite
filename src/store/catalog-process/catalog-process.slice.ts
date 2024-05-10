import { createSlice } from '@reduxjs/toolkit';
import { CamerasProcess } from '../../types/state';
import { fetchCameras } from '../api-actions';
import { NameSpace } from '../../const';

const initialState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: false,
  camerasIsNotFound: false,
  selectCameraId: '',
};

export const catalogSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.camerasIsLoading = true;
        state.camerasIsNotFound = false;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.camerasIsLoading = false;
      })

      .addCase(fetchCameras.rejected, (state) => {
        state.camerasIsLoading = false;
        state.camerasIsNotFound = true;
      });

  },
});
