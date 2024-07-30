import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, PostData, State } from '../types/state';
import { CameraItem } from '../types/camera-item';
import { APIRoute, CouponType } from '../const';
import { Reviews } from '../types/review';
import { Promo } from '../types/promo';
import { Order } from '../types/order';

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
    'data/postFormData',
    async ({ tel, id }, { extra: api }) => {
      const { data } = await api.post<PostData>(`${APIRoute.Cameras}/${id}`, tel);

      return data;
    }
  );

export const fetchPromos = createAsyncThunk<Promo[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchPromo',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<Promo[]>(APIRoute.Promo);

      return data;
    }
  );

export const postCoupon = createAsyncThunk<number, CouponType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/postCoupon',
    async (coupon, {extra: api}) => {
      const {data} = await api.post<number>(APIRoute.Coupon, {coupon});
      return data;
    }
  );

export const postOrder= createAsyncThunk<number, Order, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postOrder',
  async ({camerasIds}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Basket, {camerasIds});
    return data;
  }
);
