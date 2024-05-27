import { NameSpace } from '../../const';
import { checkPopupOpen } from './popup-process.selectors';

describe('ModalProcess selectors', () => {
  const state = {
    [NameSpace.Popup]: {
      tel: '',
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    },
  };
  it('should return isPopupOpen', () => {
    const { isPopupOpen } = state[NameSpace.Popup];
    const result = checkPopupOpen(state);
    expect(result).toEqual(isPopupOpen);
  });
});
