import { PopupProcess, PostData } from '../../types/state';
import { makeFakePostData } from '../../utils/mocks';
import { postFormData } from '../api-actions';
import { popupSlice } from './popup-process.slice';

describe('PopupProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedPostData: PostData = {
      tel: '',
      id:'',
    };
    const expectedState = {
      postData: expectedPostData,
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
    const expectedPostData: PostData = {
      tel: '',
      id:'',
    };
    const expectedState = {
      postData: expectedPostData,
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };

    const result = popupSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isPopupOpen to true with "openAddItemPopup"', () => {
    const expectedPostData: PostData = {
      tel: '',
      id:'',
    };
    const initialState = {
      postData: expectedPostData,
      isPopupOpen: false,
      isPopupCallMeOpen: false,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };
    const expectedState = {
      postData: expectedPostData,
      isPopupOpen: true,
      isPopupCallMeOpen: true,
      popupCallIsLoading: false,
      popupCallIsNotFound: false,
    };

    const result = popupSlice.reducer(
      initialState,
      popupSlice.actions.openAddItemPopup()
    );

    expect(result).toEqual(expectedState);
  });

  const expectedPostData: PostData = {
    tel: '',
    id:'',
  };
  const initialState = {
    postData: expectedPostData,
    isPopupOpen: false,
    isPopupCallMeOpen: false,
    popupCallIsLoading: false,
    popupCallIsNotFound: false,
  };

  let state: PopupProcess;

  describe('Slice product-process', () => {

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

      const result = popupSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('postFormData fulfilled', () => {
      const fakeCamera = makeFakePostData();
      const expectedState: PopupProcess = { ...initialState, postData: fakeCamera };

      const result = popupSlice.reducer(state, { type: postFormData.fulfilled.type, payload: fakeCamera, });

      expect(result).toEqual(expectedState);
    });

    it('postFormData rejected', () => {
      const expectedState: PopupProcess = { ...initialState, popupCallIsLoading: false, popupCallIsNotFound: true };
      const actualState: PopupProcess = { ...initialState, popupCallIsLoading: true, popupCallIsNotFound: false };

      const result = popupSlice.reducer(actualState, { type: postFormData.rejected.type });

      expect(result).toEqual(expectedState);
    });
  });
});
