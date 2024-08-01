import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const checkAddItemPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemPopupOpen;

export const checkSuccessPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isSuccessPopupOpen;
