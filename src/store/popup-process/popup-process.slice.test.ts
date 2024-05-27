import { popupSlice } from './popup-process.slice';

describe('PopupProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      tel: '',
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };

    const result = popupSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      tel: '',
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };

    const result = popupSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isPopupOpen to true with "openCallMePopup"', () => {
    const initialState = {
      tel: '',
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };
    const expectedState = {
      tel: '',
      isPopupOpen: true,
      isPopupCallMeOpen: true,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };

    const result = popupSlice.reducer(
      initialState,
      popupSlice.actions.openCallMePopup()
    );

    expect(result).toEqual(expectedState);
  });

});
