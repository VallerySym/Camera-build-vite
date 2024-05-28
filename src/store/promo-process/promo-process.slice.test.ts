import { PromoProcess } from '../../types/state';
import { makeFakePromoList } from '../../utils/mocks';
import { fetchPromos } from '../api-actions';
import { promoSlice } from './promo-process.slice';

const initialState: PromoProcess = {
  promoCameras: [],
  promoCamerasIsLoading: false,
  promoCamerasIsNotFound: false,
};

let state: PromoProcess;

describe('Slice promo-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState: PromoProcess = { ...initialState };

    const result = promoSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: PromoProcess = { ...initialState };

    const result = promoSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('fetchPromos fulfilled', () => {
    const fakePromoCamera = makeFakePromoList();
    const expectedState: PromoProcess = { ...initialState, promoCameras: fakePromoCamera };

    const result = promoSlice.reducer(state, { type: fetchPromos.fulfilled.type, payload: fakePromoCamera, });

    expect(result).toEqual(expectedState);
  });

  it('fetchPromos rejected', () => {
    const expectedState: PromoProcess = { ...initialState, promoCamerasIsLoading: false, promoCamerasIsNotFound: true };
    const actualState: PromoProcess = { ...initialState, promoCamerasIsLoading: true, promoCamerasIsNotFound: false };

    const result = promoSlice.reducer(actualState, { type: fetchPromos.rejected.type });
   
    expect(result).toEqual(expectedState);
  });
});
