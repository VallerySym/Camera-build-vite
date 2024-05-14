import { productSlice } from './product-process.slice';
import { CameraProcess } from '../../types/state';
import { makeFakeCamera } from '../../utils/mocks';
import { fetchCamera } from '../api-actions';

const initialState: CameraProcess = {
    camera: null,
    cameraIsLoading: false,
    cameraIsNotFound: false,
};

let state: CameraProcess;

describe('Slice product-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: CameraProcess = { ...initialState };

    const result = productSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: CameraProcess = { ...initialState };

    const result = productSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('fetchCamera fulfilled', () => {
    const fakeCamera = makeFakeCamera();
    const expectedState: CameraProcess = { ...initialState, camera: fakeCamera };

    const result = productSlice.reducer(state, { type: fetchCamera.fulfilled.type, payload: fakeCamera, });

    expect(result).toEqual(expectedState);
  });

  it('fetchCamera rejected', () => {
    const expectedState: CameraProcess = { ...initialState, cameraIsLoading: false, cameraIsNotFound: true };
    const actualState: CameraProcess = { ...initialState, cameraIsLoading: true, cameraIsNotFound: false };

    const result = productSlice.reducer(actualState, { type: fetchCamera.rejected.type });

    expect(result).toEqual(expectedState);
  });
});

