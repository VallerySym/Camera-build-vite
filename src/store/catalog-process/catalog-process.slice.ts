import { createSlice,PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    selectProductId: (state, action: PayloadAction<string>) => {
      state.selectCameraId = action.payload;
      state.cameras.map((camera) => {
        if (camera.id === Number(action.payload)) {
          state.selectCameraId = camera;
        }
      });
    },
  },

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

export const {selectProductId} = catalogSlice.actions;
