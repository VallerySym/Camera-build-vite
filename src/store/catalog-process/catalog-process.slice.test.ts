import { CamerasProcess } from '../../types/state';
import { catalogSlice } from './catalog-process.slice';

const initialState: CamerasProcess = {
  cameras: [],
  camerasIsLoading: false,
  camerasIsNotFound: false,
  selectCameraId: '',
};

let state: CamerasProcess;

describe('Slice catalog-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState: CamerasProcess = { ...initialState };

    const result = catalogSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: CamerasProcess = { ...initialState };

    const result = catalogSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
