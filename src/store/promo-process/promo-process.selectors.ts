import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Promos } from '../../types/promo';

export const getPromoCameras = (state: Pick<State, NameSpace.Promo>): Promos =>
  state[NameSpace.Promo].promoCameras;

export const getPromoCamerasIsLoading = (state: Pick<State, NameSpace.Promo>): boolean =>
  state[NameSpace.Promo].promoCamerasIsLoading;

export const getPromoCamerasIsNotFound = (state: Pick<State, NameSpace.Promo>): boolean =>
  state[NameSpace.Promo].promoCamerasIsNotFound;

