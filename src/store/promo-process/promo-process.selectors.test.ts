import { NameSpace } from '../../const';
import { PromoProcess } from '../../types/state';
import { getPromoCameras, getPromoCamerasIsLoading, getPromoCamerasIsNotFound } from './promo-process.selectors';

const fakeState: PromoProcess = {
  promoCameras: [],
  promoCamerasIsLoading: true,
  promoCamerasIsNotFound: false,
};

let state = { [NameSpace.Promo]: fakeState };

describe('PromoProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Promo]: { ...fakeState } };
  });

  it('should return "cameras" from state', () => {
    const { promoCameras } = state[NameSpace.Promo];
    const result = getPromoCameras(state);

    expect(result).toEqual(promoCameras);
  });

  it('should return true offersIsLoading status', () => {
    const result = getPromoCamerasIsLoading(state);

    expect(result).toEqual(true);
  });

  it('should return false offersIsNotFound status', () => {
    const result = getPromoCamerasIsNotFound(state);

    expect(result).toEqual(false);
  });
});

