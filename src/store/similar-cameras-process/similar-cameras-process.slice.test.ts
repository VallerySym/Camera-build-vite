import { SimilarCamerasProcess } from '../../types/state';
import { makeFakeCameras } from '../../utils/mocks';
import { fetchCameras } from '../api-actions';
import { similarCamerasSlice } from './similar-cameras-process.slice';

const initialState: SimilarCamerasProcess = {
  similarCameras: [],
  similarCameraIsLoading: false,
  similarCameraIsNotFound: false,
};

let state: SimilarCamerasProcess;

describe('CatalogProcess slice', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState: SimilarCamerasProcess = { ...initialState };

    const result = similarCamerasSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: SimilarCamerasProcess = { ...initialState };

    const result = similarCamerasSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('fetchCameras fulfilled', () => {
    const fakeCameras = makeFakeCameras();
    const expectedState: SimilarCamerasProcess = { ...initialState, similarCameras: fakeCameras };

    const result = similarCamerasSlice.reducer(state, { type: fetchCameras.fulfilled.type, payload: fakeCameras, });

    expect(result).toEqual(expectedState);
  });

  it('fetchCameras rejected', () => {
    const expectedState: SimilarCamerasProcess = { ...initialState, similarCameraIsLoading: false, similarCameraIsNotFound: true };
    const actualState: SimilarCamerasProcess = { ...initialState, similarCameraIsLoading: true, similarCameraIsNotFound: false };

    const result = similarCamerasSlice.reducer(actualState, { type: fetchCameras.rejected.type });

    expect(result).toEqual(expectedState);
  });
});
