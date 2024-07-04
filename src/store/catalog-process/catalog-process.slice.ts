import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CamerasProcess } from '../../types/state';
import { fetchCameras } from '../api-actions';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, NameSpace, SortOrder, SortType } from '../../const';
import { CameraItemCategory, CameraItemLevel, CameraItemType } from '../../types/camera-item';

const initialState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: false,
  camerasIsNotFound: false,
  selectCameraId: '',
  sortType: DEFAULT_SORT_TYPE,
  sortOrder: DEFAULT_SORT_ORDER,
  category: null,
  type: [],
  level: [],
  minPrice: 0,
  maxPrice: 0,
  isResetFilters: false,
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
    setCamerasCategory: (state, action: PayloadAction<CameraItemCategory>) => {
      state.category = action.payload;
    },
    setCamerasType: (state, action: PayloadAction<CameraItemType>) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      } else {
        state.type = state.type.filter((type) => type !== action.payload);
      }
    },
    setCamerasLevel: (state, action: PayloadAction<CameraItemLevel>) => {
      if (!state.level.includes(action.payload)) {
        state.level.push(action.payload);
      } else {
        state.level = state.level.filter((level) => level !== action.payload);
      }
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.type = [];
      state.level = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.isResetFilters = true;
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

export const { setSortByType, setSortByOrder, setCamerasCategory, setCamerasType, setCamerasLevel, setMinPrice, setMaxPrice, resetFilters } = catalogSlice.actions;
