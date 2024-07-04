import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { filterCameras, sortCameras } from '../../components/catalog-filter/utils';

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

export const getSortedCameras = createSelector(
  [getCameras, getSortType, getSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

export const getCamerasCategory = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].category;

export const getCamerasType = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].type;

export const getCamerasLevel = (state: Pick<State, NameSpace.Cameras>) =>
  state[NameSpace.Cameras].level;

export const getCamerasMinPrice = (state: Pick<State, NameSpace.Cameras>): number =>
  state[NameSpace.Cameras].minPrice;

export const getCamerasMaxPrice = (state: Pick<State, NameSpace.Cameras>): number =>
  state[NameSpace.Cameras].maxPrice;

export const getFilteredCameras = createSelector(
  [getSortedCameras, getCamerasCategory, getCamerasType, getCamerasLevel, getCamerasMinPrice, getCamerasMaxPrice],
  (cameras, category, type, level, minPrice, maxPrice) =>
    filterCameras(cameras, category, type, level, minPrice, maxPrice)
);
