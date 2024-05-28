import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, PostData, State } from '../types/state';
import { CameraItem } from '../types/camera-item';
import { APIRoute } from '../const';
import { Reviews } from '../types/review';
import { Promo } from '../types/promo';

export const fetchCameras = createAsyncThunk<CameraItem[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'cameras/fetchCameras',
    async (_arg, { extra: api }) => {
      const { data } = await api
        .get<CameraItem[]>(APIRoute.Cameras)
        .catch((err: AxiosError) => {
          throw toast.error(err.message);
        });

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

export const postFormData = createAsyncThunk<PostData, PostData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'postFormData',
    async ({ postData, id }, { extra: api }) => {
      const { data } = await api.post<PostData>(`${APIRoute.Cameras}/${id}`, postData);

      return data;
    }
  );

export const fetchPromos = createAsyncThunk<Promo[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'DATA/fetchPromo',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<Promo[]>(APIRoute.Promo);

      return data;
    }
  );
