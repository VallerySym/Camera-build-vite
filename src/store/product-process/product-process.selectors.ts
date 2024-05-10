import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { CameraItem } from '../../types/camera-item';

export const getCamera = (state: Pick<State, NameSpace.Camera>): CameraItem | null =>
  state[NameSpace.Camera].camera;

export const getCameraIsLoading = (state: Pick<State, NameSpace.Camera>): boolean =>
  state[NameSpace.Camera].cameraIsLoading;

export const getCameraIsNotFound = (state: Pick<State, NameSpace.Camera>): boolean =>
  state[NameSpace.Camera].cameraIsNotFound;
