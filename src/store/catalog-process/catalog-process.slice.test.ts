import { CamerasProcess } from '../../types/state';
import { makeFakeCameras } from '../../utils/mocks';
import { fetchCameras } from '../api-actions';
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

  it('fetchCameras fulfilled', () => {
    const fakeCameras = makeFakeCameras();
    const expectedState: CamerasProcess = { ...initialState, cameras: fakeCameras };

    const result = catalogSlice.reducer(state, { type: fetchCameras.fulfilled.type, payload: fakeCameras, });

    expect(result).toEqual(expectedState);
  });

  it('fetchCameras rejected', () => {
    const expectedState: CamerasProcess = { ...initialState, camerasIsLoading: false, camerasIsNotFound: true };
    const actualState: CamerasProcess = { ...initialState, camerasIsLoading: true, camerasIsNotFound: false };

    const result = catalogSlice.reducer(actualState, { type: fetchCameras.rejected.type });

    expect(result).toEqual(expectedState);
  });
});
