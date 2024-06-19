import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { CamerasProcess } from '../../types/state';
import { fetchCameras } from '../api-actions';
import { CameraCategory, DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, NameSpace, SortOrder, SortType } from '../../const';

const initialState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: false,
  camerasIsNotFound: false,
  selectCameraId: '',
  sortType: DEFAULT_SORT_TYPE,
  sortOrder: DEFAULT_SORT_ORDER,
  category: null,
  isReset: false,
};

export const catalogSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setSortByType: (state, action: PayloadAction<SortType>) => {
      if (state.sortOrder === null) {
        state.sortOrder = SortOrder.Down;
      }
      state.sortType = action.payload;
    },
    setSortByOrder: (state, action: PayloadAction<SortOrder>) => {
      if (state.sortType === null) {
        state.sortType = SortType.Price;
      }
      state.sortOrder = action.payload;
    },
    setCamerasCategory: (state, action: PayloadAction<CameraCategory>) => {
      state.category = action.payload;
    },
    resetFilters: (state) => {
      state.sortType = null;
      state.sortOrder = null;
      state.category = null;
      state.isReset = true;
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

export const{ setSortByType, setSortByOrder, setCamerasCategory, resetFilters} = catalogSlice.actions;
