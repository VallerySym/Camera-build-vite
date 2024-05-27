import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PopupProcess } from '../../types/state';

const initialState: PopupProcess = {
  tel: '',
  isPopupOpen: false,
  isPopupCallMeOpen: false,
  popupCallIsLoading: false,
  popupCallIsNotFound: false,
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
    },
    setFormTel: (state, action: PayloadAction<string>) => {
      state.tel = action.payload;
    },
  },
});

export const { openCallMePopup, closeCallMePopup, setFormTel } = popupSlice.actions;
