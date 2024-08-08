import { CouponType, RequestStatus } from '../../const';
import { BasketProcess } from '../../types/state';
import { postCoupon, postOrder } from '../api-actions';
import { basketSlice } from './basket-process.slice';

const initialState: BasketProcess = {
  items: [],
  discount: 0,
  discountPercent: 0,
  promoCode: null,
  hasError: false,
  isPromoCodeValid: false,
  basketStatus: RequestStatus.Idle,
};

let state: BasketProcess;

describe('Slice basket-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState: BasketProcess = { ...initialState };

    const result = basketSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: BasketProcess = { ...initialState };

    const result = basketSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };

    const result = basketSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };

    const result = basketSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set hasError to "false" and isPromoCodeValid to "false" with "postCoupon.pending"', () => {
    const originalState = {
      ...initialState,
      isPromoCodeValid: true,
      hasError: true,
    };

    const expectedState = {
      ...initialState,
      isPromoCodeValid: false,
      hasError: false,
    };

    const result = basketSlice.reducer(originalState, postCoupon.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set number of "discount", "isPromoCodeValid" to "true" with "postCoupon.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      discount: 15,
      isPromoCodeValid: true,
    };

    const result = basketSlice.reducer(
      undefined,
      postCoupon.fulfilled(
        15, '', CouponType['camera-333'])
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "hasError" to "true" & "discount" to "0" with "postCoupon.rejected', () => {
    const expectedState = {
      ...initialState,
      hasError: true,
      discount: 0
    };

    const result = basketSlice.reducer(
      undefined,
      postCoupon.rejected,
    );

    expect(result).toEqual(expectedState);
  });

  it('should set status to "loading" with "postOrder.pending"', () => {
    const expectedState: BasketProcess = { ...initialState, basketStatus: RequestStatus.Loading, };

    const result = basketSlice.reducer(
      state, postOrder.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('should set  status to "success" with "postOrder.fulfilled"', () => {
    const expectedState: BasketProcess = { ...initialState, basketStatus: RequestStatus.Success, };

    const result = basketSlice.reducer(
      state, postOrder.fulfilled(10, '', { camerasIds: [1, 3], coupon: CouponType['camera-555'] })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "error" with "postOrder.rejected', () => {
    const expectedState: BasketProcess = { ...initialState, basketStatus: RequestStatus.Error, };

    const result = basketSlice.reducer(
      state, postOrder.rejected,
    );

    expect(result).toEqual(expectedState);
  });
});
