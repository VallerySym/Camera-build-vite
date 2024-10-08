import { PopupProcess } from '../../types/state';
import { popupSlice } from './popup-process.slice';

const initialState = {
  isAddItemPopupOpen: false,
  isSuccessPopupOpen: false,
  isDeleteItemPopupOpen: false,
  isOrderSuccessPopupOpen: false,
  isAddReviewPopupOpen: false,
  isAddReviewSuccessPopupOpen: false,
  errorAddReview: false,
};

let state: PopupProcess;

describe('PopupProcess slice', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: PopupProcess = { ...initialState };

    const result = popupSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: PopupProcess = { ...initialState };

    const result = popupSlice.reducer(state, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: PopupProcess = { ...initialState };

    const result = popupSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: PopupProcess = { ...initialState };

    const result = popupSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

});
