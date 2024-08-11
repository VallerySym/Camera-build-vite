import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, NameSpace } from '../../const';
import { CamerasProcess } from '../../types/state';
import { getCameras, getCamerasIsLoading, getCamerasIsNotFound, getSortType, getCamerasLevel, getCurrentPage} from './catalog-process.selectors';

const fakeState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: false,
  camerasIsNotFound: false,
  selectCameraId: '',
  sortType: DEFAULT_SORT_TYPE,
  sortOrder: DEFAULT_SORT_ORDER,
  category: null,
  type: [],
  level: [],
  minPrice: 0,
  maxPrice: 0,
  isResetFilters: false,
  currentPage: 1,
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

    expect(result).toEqual(false);
  });

  it('should return false camerasIsNotFound status', () => {
    const result = getCamerasIsNotFound(state);

    expect(result).toEqual(false);
  });

  it('should return sortType from state', () => {
    const { sortType } = state[NameSpace.Cameras];
    const result = getSortType(state);

    expect(result).toEqual(sortType);
  });

  it('should return camerasLevel from state', () => {
    const { level } = state[NameSpace.Cameras];
    const result = getCamerasLevel(state);

    expect(result).toEqual(level);
  });

  it('should return currentPage from state', () => {
    const { currentPage } = state[NameSpace.Cameras];
    const result = getCurrentPage(state);

    expect(result).toEqual(currentPage);
  });
});
