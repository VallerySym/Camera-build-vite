import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const checkPopupOpen = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isPopupOpen;
