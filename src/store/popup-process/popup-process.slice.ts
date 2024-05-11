import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PopupProcess } from '../../types/state';

const initialState: PopupProcess = {
  isPopupOpen: false,
  isPopupCallMeOpen: false,
};

export const popupSlice = createSlice({
  name: NameSpace.Popup,
  initialState,
  reducers: {
    openCallMePopup: (state) => {
      state.isPopupOpen = true;
      state.isPopupCallMeOpen = true;
    },
    closeCallMePopup: (state) => {
      state.isPopupOpen = false;
      state.isPopupCallMeOpen = false;
    }
  },
  extraReducers(builder) {
    builder;
  },
});

export const { openCallMePopup, closeCallMePopup } = popupSlice.actions;
