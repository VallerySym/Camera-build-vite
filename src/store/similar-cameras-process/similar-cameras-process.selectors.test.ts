import { NameSpace } from '../../const';
import { SimilarCamerasProcess } from '../../types/state';
import { getSimilarCameras, getSimilarCamerasIsLoading, getSimilarCamerasIsNotFound } from './similar-cameras-process.selectors';

const fakeState: SimilarCamerasProcess = {
  similarCameras: [],
  similarCameraIsLoading: true,
  similarCameraIsNotFound: false,
};

let state = { [NameSpace.Similar]: fakeState };

describe('SimilarCamerasProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Similar]: { ...fakeState } };
  });

  it('should return similarCameras from state', () => {
    const { similarCameras } = state[NameSpace.Similar];
    const result = getSimilarCameras(state);
    expect(result).toEqual(similarCameras);
  });

  it('should return true similarCameraIsLoading status', () => {
    const result = getSimilarCamerasIsLoading(state);

    expect(result).toEqual(true);
  });

  it('should return false similarCameraIsNotFound status', () => {
    const result = getSimilarCamerasIsNotFound(state);

    expect(result).toEqual(false);
  });
});
