import { PromoProcess } from '../../types/state';
import { promoSlice } from './promo-process.slice';

const initialState: PromoProcess = {
  promoCameras: [],
  promoCamerasIsLoading: false,
  promoCamerasIsNotFound: false,
};

describe('Slice promo-process', () => {
  let state: PromoProcess;

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
});
