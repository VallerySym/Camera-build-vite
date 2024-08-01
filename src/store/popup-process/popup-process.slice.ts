import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PopupProcess } from '../../types/state';

const initialState: PopupProcess = {
  isPopupOpen: false,
  isAddItemPopupOpen: false,
  isSuccessPopupOpen:false,

};

export const popupSlice = createSlice({
  name: NameSpace.Popup,
  initialState,
  reducers: {
    openAddItemPopup: (state) => {
      state.isPopupOpen = true;
      state.isAddItemPopupOpen = true;
    },
    closeAddItemPopup: (state) => {
      state.isPopupOpen = false;
      state.isAddItemPopupOpen = false;
    },
    openSuccessPopup: (state) => {
      state.isPopupOpen = true;
      state.isSuccessPopupOpen = true;
    },
    closeSuccessPopup: (state) => {
      state.isPopupOpen = false;
      state.isSuccessPopupOpen = false;
    },

  },
});

export const { openAddItemPopup, closeAddItemPopup, openSuccessPopup, closeSuccessPopup} = popupSlice.actions;
