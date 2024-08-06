import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PopupProcess } from '../../types/state';

const initialState: PopupProcess = {
  isAddItemPopupOpen: false,
  isSuccessPopupOpen: false,
  isDeleteItemPopupOpen: false,
  isOrderSuccessPopupOpen: false,
  isAddReviewPopupOpen: false,
  isAddReviewSuccessPopupOpen: false,
  errorAddReview:false,
};

export const popupSlice = createSlice({
  name: NameSpace.Popup,
  initialState,
  reducers: {
    openAddItemPopup: (state) => {
      state.isAddItemPopupOpen = true;
    },
    closeAddItemPopup: (state) => {
      state.isAddItemPopupOpen = false;
    },
    openSuccessPopup: (state) => {
      state.isSuccessPopupOpen = true;
    },
    closeSuccessPopup: (state) => {
      state.isSuccessPopupOpen = false;
    },
    openDeleteItemPopup: (state) => {
      state.isDeleteItemPopupOpen = true;
    },
    closeDeleteItemPopup: (state) => {
      state.isDeleteItemPopupOpen = false;
    },
    openOrderSuccessPopup: (state) => {
      state.isOrderSuccessPopupOpen = true;
    },
    closeOrderSuccessPopup: (state) => {
      state.isOrderSuccessPopupOpen = false;
    },
    openAddReviewPopup: (state) => {
      state.isAddReviewPopupOpen = true;
    },
    closeAddReviewPopup: (state) => {
      state.isAddReviewPopupOpen = false;
    },
    openAddReviewSuccessPopup: (state) => {
      state.isAddReviewSuccessPopupOpen = true;
    },
    closeAddReviewSuccessPopup: (state) => {
      state.isAddReviewSuccessPopupOpen = false;
    },
  },
});

export const {
  openAddItemPopup, closeAddItemPopup,
  openSuccessPopup, closeSuccessPopup,
  openDeleteItemPopup, closeDeleteItemPopup,
  openOrderSuccessPopup, closeOrderSuccessPopup,
  openAddReviewPopup, closeAddReviewPopup,
  openAddReviewSuccessPopup,closeAddReviewSuccessPopup
} = popupSlice.actions;
