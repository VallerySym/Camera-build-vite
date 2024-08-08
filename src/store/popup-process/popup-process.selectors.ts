import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const checkAddItemPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemPopupOpen;

export const checkSuccessPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isSuccessPopupOpen;

export const checkDeleteItemPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isDeleteItemPopupOpen;

export const checkOrderSuccessPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isOrderSuccessPopupOpen;

export const checkAddReviewPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddReviewPopupOpen;

export const checkAddReviewSuccessPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddReviewSuccessPopupOpen;

export const getErrorAddReview = (state: Pick<State, NameSpace.Popup>): boolean =>
  state[NameSpace.Popup].errorAddReview;
