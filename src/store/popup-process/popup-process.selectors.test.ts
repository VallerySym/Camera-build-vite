import { NameSpace } from '../../const';
import { checkAddItemPopupOpen } from './popup-process.selectors';

describe('ModalProcess selectors', () => {
  const state = {
    [NameSpace.Popup]: {
      isPopupOpen: false,
      isAddItemPopupOpen: false,
      isSuccessPopupOpen: false,
    },
  };
  it('should return isPopupOpen', () => {
    const { isPopupOpen } = state[NameSpace.Popup];
    const result = checkAddItemPopupOpen(state);
    expect(result).toEqual(isPopupOpen);
  });
});
