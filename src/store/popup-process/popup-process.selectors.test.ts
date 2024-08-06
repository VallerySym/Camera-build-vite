import { NameSpace } from '../../const';
import { checkAddItemPopupOpen } from './popup-process.selectors';

describe('ModalProcess selectors', () => {
  const state = {
    [NameSpace.Popup]: {
      isAddItemPopupOpen: false,
      isSuccessPopupOpen: false,
      isDeleteItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isAddReviewPopupOpen: false,
      isAddReviewSuccessPopupOpen: false,
      errorAddReview:false,
    },
  };
  it('should return isPopupOpen', () => {
    const { isAddItemPopupOpen } = state[NameSpace.Popup];
    const result = checkAddItemPopupOpen(state);
    expect(result).toEqual(isAddItemPopupOpen);
  });
});
