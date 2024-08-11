import { NameSpace } from '../../const';
import { PopupProcess } from '../../types/state';
import { checkAddItemPopupOpen } from './popup-process.selectors';

const fakeState: PopupProcess = {
  isAddItemPopupOpen: false,
  isSuccessPopupOpen: false,
  isDeleteItemPopupOpen: false,
  isOrderSuccessPopupOpen: false,
  isAddReviewPopupOpen: false,
  isAddReviewSuccessPopupOpen: false,
  errorAddReview:false,
};

let state = { [NameSpace.Popup]: fakeState };

describe('ModalProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Popup]: { ...fakeState } };
  });

  it('should return isAddItemPopupOpen', () => {
    const { isAddItemPopupOpen } = state[NameSpace.Popup];
    const result = checkAddItemPopupOpen(state);
    expect(result).toEqual(isAddItemPopupOpen);
  });
});
