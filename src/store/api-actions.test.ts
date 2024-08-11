import { describe } from 'vitest';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import {extractActionsTypes, makeFakeCamera, makeFakeCameras, makeFakePromoList,makeFakeReviews,} from '../utils/mocks';
import { AppThunkDispatch } from '../utils/mock-component';
import { APIRoute, CouponType } from '../const';
import {fetchCameras,fetchCamera, fetchPromos,fetchReviews, postCoupon,} from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ CAMERAS: { cameras: [] } });
  });

  describe('fetchCameras', () => {
    it('should dispatch "fetchCameras.pending", "fetchCameras.fulfulled", when server response 200', async () => {
      const mockCameras = [makeFakeCameras()];
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameras);

      await store.dispatch(fetchCameras());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions[1] as ReturnType<typeof fetchCameras.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchCameras.pending.type,
        fetchCameras.fulfilled.type
      ]);

      expect(fetchProductsActionFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchCameras.pending", "fetchCameras.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCameras());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCameras.pending.type,
        fetchCameras.rejected.type
      ]);
    });

  });

  describe('fetchPromos', () => {
    it('should dispatch "fetchPromos.pending", "fetchPromos.fulfulled", when server response 200', async () => {
      const mockPromoList = [makeFakePromoList()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoList);

      await store.dispatch(fetchPromos());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionPromoFulfilled = emittedActions[1] as ReturnType<typeof fetchPromos.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchPromos.pending.type,
        fetchPromos.fulfilled.type
      ]);

      expect(fetchProductsActionPromoFulfilled.payload).toEqual(mockPromoList);
    });

    it('should dispatch "fetchPromos.pending", "fetchPromos.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromos());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromos.pending.type,
        fetchPromos.rejected.type
      ]);
    });

  });

  describe('fetchCamera', () => {
    const mockProductData = makeFakeCamera();
    it('should dispatch "fetchCamera.pending", "fetchCamera.fulfulled", when server response 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}`)
        .reply(200, mockProductData);

      await store.dispatch(fetchCamera(Number(mockProductData.id)));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const getProductDataActionFulfilled = emittedActions[1] as ReturnType<typeof fetchCamera.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchCamera.pending.type,
        fetchCamera.fulfilled.type
      ]);

      expect(getProductDataActionFulfilled.payload).toEqual(mockProductData);
    });

    it('should dispatch "fetchCamera.pending", "fetchCamera.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}`).reply(400, []);

      await store.dispatch(fetchCamera(Number(mockProductData.id)));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamera.pending.type,
        fetchCamera.rejected.type
      ]);
    });
  });

  describe('fetchReviews', () => {
    const mockCamera = makeFakeCamera();
    const mockReviews = [makeFakeReviews()];
    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfulled", when server response 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews(Number(mockCamera.id)));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const getReviewsActionFulfilled = emittedActions[1] as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type
      ]);

      expect(getReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}${APIRoute.Reviews}`).reply(400, []);

      await store.dispatch(fetchReviews(Number(mockCamera.id)));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type
      ]);
    });
  });

  describe('postCoupon', () => {

    it('should dispatch "postCoupon.pending", "postCoupon.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, {coupon: CouponType['camera-555']}).reply(200, 15);

      await store.dispatch(postCoupon(CouponType['camera-555']));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postCouponActionFulfilled = emittedActions.at(1) as ReturnType<typeof postCoupon.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postCoupon.pending.type,
        postCoupon.fulfilled.type,
      ]);

      expect(postCouponActionFulfilled.payload)
        .toEqual(15);
    });

    it('should dispatch "postCoupon.pending", "postCoupon.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, {coupon: CouponType['camera-555']}).reply(400, []);

      await store.dispatch(postCoupon(CouponType['camera-555']));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCoupon.pending.type,
        postCoupon.rejected.type,
      ]);
    });
  });
});

