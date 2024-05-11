import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { CameraItem } from '../types/camera-item';
import { APIRoute } from '../const';
import { Reviews } from '../types/review';

export const fetchCameras = createAsyncThunk<CameraItem[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'cameras/fetchCameras',
    async (_arg, { extra: api }) => {
      const { data } = await api.get<CameraItem[]>(APIRoute.Cameras);

      return data;
    }
  );

export const fetchCamera = createAsyncThunk<CameraItem, number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCamera',
    async (_arg, { extra: api }) => {
      const id = _arg;
      const { data } = await api.get<CameraItem>(`${APIRoute.Cameras}/${id}`);

      return data;
    },
  );


export const fetchReviews = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (clickedProductId, { extra: api }) => {

    const { data } = await api.get<Reviews>(`${APIRoute.Cameras}/${clickedProductId}${APIRoute.Reviews}`);

    return data;
  });
