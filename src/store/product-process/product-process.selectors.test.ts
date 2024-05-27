import { NameSpace } from '../../const';
import { CameraProcess } from '../../types/state';
import { getCamera, getCameraIsLoading, getCameraIsNotFound } from './product-process.selectors';

const fakeState: CameraProcess = {
  camera: null,
  cameraIsLoading: true,
  cameraIsNotFound: false,
};

let state = { [NameSpace.Camera]: fakeState };

describe('ProductProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Camera]: { ...fakeState } };
  });

  it('should return "camera" from state', () => {
    const { camera } = state[NameSpace.Camera];
    const result = getCamera(state);
    expect(result).toEqual(camera);
  });

  it('should return true cameraIsLoading status', () => {
    const result = getCameraIsLoading(state);

    expect(result).toEqual(true);
  });

  it('should return false cameraIsNotFound status', () => {
    const result = getCameraIsNotFound(state);

    expect(result).toEqual(false);
  });

});
