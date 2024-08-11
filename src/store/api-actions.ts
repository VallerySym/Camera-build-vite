import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../types/state';
import { CameraItem } from '../types/camera-item';
import { APIRoute, CouponType } from '../const';
import { Reviews, Review } from '../types/review';
import { Promo } from '../types/promo';
import { Order } from '../types/order';
import { FieldValues } from 'react-hook-form';

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

export const postOrder = createAsyncThunk<number, Order, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postOrder',
  async ({camerasIds, coupon}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Order, {camerasIds, coupon});
    return data;
  }
);

export const submitReviews = createAsyncThunk<Review, FieldValues, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/submitReviews',
  async (param, { extra: api }) => {
    const response = await api.post<Review>(APIRoute.Reviews, param);
    const { data } = response;
    return data;
  },
);
