import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSimilarCameras = (state: Pick<State, NameSpace.Similar>) =>
  state[NameSpace.Similar].similarCameras;

export const getSimilarCamerasIsLoading = (state: Pick<State, NameSpace.Similar>): boolean =>
  state[NameSpace.Similar].similarCameraIsLoading;

export const getSimilarCamerasIsNotFound = (state: Pick<State, NameSpace.Similar>): boolean =>
  state[NameSpace.Similar].similarCameraIsNotFound;
