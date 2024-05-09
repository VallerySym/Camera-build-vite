import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCamerasIsLoading = (state: Pick<State, NameSpace.Cameras>): boolean =>
  state[NameSpace.Cameras].camerasIsLoading;

export const getCamerasIsNotFound = (state: Pick<State, NameSpace.Cameras>): boolean =>
  state[NameSpace.Cameras].camerasIsNotFound;

export const getCameras = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].cameras;
