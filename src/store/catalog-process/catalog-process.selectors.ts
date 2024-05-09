import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCamerasIsLoading = (state: Pick<State, NameSpace.Catalog>): boolean =>
  state[NameSpace.Catalog].camerasIsLoading;

export const getCamerasIsNotFound = (state: Pick<State, NameSpace.Catalog>): boolean =>
  state[NameSpace.Catalog].camerasIsNotFound;

export const getCameras = (state: Pick<State, NameSpace.Catalog>) =>
  state[NameSpace.Catalog].cameras;
