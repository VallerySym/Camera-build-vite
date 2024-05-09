import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { CameraItem } from '../types/camera-item';
import { APIRoute } from '../const';

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

  export const fetchCamera = createAsyncThunk<CameraItem, number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCamera',
    async (_arg, { extra: api }) => {
      const id = _arg;
      const { data } = await api.get<CameraItem>(`${APIRoute.Product}/${id}`);

      return data;
    },
  );