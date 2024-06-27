import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, NameSpace } from '../../const';
import { CamerasProcess } from '../../types/state';
import { getCameras, getCamerasIsLoading, getCamerasIsNotFound } from './catalog-process.selectors';

const fakeState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: true,
  camerasIsNotFound: false,
  selectCameraId: '',
  sortType: DEFAULT_SORT_TYPE,
  sortOrder: DEFAULT_SORT_ORDER,
  category: null,
  type: [],
  level: [],
  isResetFilters: false,
};

let state = { [NameSpace.Cameras]: fakeState };

describe('CamerasProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Cameras]: { ...fakeState } };
  });

  it('should return "cameras" from state', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = getCameras(state);

    expect(result).toEqual(cameras);
  });

  it('should return true camerasIsLoading status', () => {
    const result = getCamerasIsLoading(state);

    expect(result).toEqual(true);
  });

  it('should return false camerasIsNotFound status', () => {
    const result = getCamerasIsNotFound(state);

    expect(result).toEqual(false);
  });
});

