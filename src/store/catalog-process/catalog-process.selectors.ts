import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCameras = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].cameras;

export const getCamerasIsLoading = (state: Pick<State, NameSpace.Cameras>): boolean =>
  state[NameSpace.Cameras].camerasIsLoading;

export const getCamerasIsNotFound = (state: Pick<State, NameSpace.Cameras>): boolean =>
  state[NameSpace.Cameras].camerasIsNotFound;


export const getSortType = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].sortType;

export const getSortOrder = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].sortOrder;

export const getCamerasCategory = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].category;
