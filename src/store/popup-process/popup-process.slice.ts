import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PopupProcess, PostData } from '../../types/state';
import { postFormData } from '../api-actions';

const initialPostData: PostData = {
  tel: '',
  id:'',
};

const initialState: PopupProcess = {
  postData:initialPostData,
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
      state.postData.tel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postFormData.pending, (state) => {
        state.popupCallIsLoading = true;
        state.popupCallIsNotFound = false;
      })
      .addCase(postFormData.fulfilled, (state, action) => {
        state.postData = action.payload;
        state.popupCallIsLoading = false;
      })
      .addCase(postFormData.rejected, (state) => {
        state.popupCallIsLoading = false;
        state.popupCallIsNotFound = true;
      });

  },
});

export const { openCallMePopup, closeCallMePopup, setFormTel } = popupSlice.actions;
