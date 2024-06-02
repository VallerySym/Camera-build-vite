import { ReviewsProcess } from '../../types/state';
import { reviewsSlice } from './reviews-process.slice';
import { makeFakeReviews } from '../../utils/mocks';
import { fetchReviews } from '../api-actions';
import { RequestStatus } from '../../const';

const initialState: ReviewsProcess = {
  reviews: [],
  reviewsIsLoading: false,
  reviewsIsNotFound: false,
  reviewRequestStatus: RequestStatus.Idle,
};

let state: ReviewsProcess;

describe('Slice reviews-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: ReviewsProcess = { ...initialState };

    const result = reviewsSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: ReviewsProcess = { ...initialState };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('fetchReviewsAction fulfilled', () => {
    const fakeReviews = makeFakeReviews();
    const expectedState: ReviewsProcess = { ...initialState, reviews: fakeReviews };

    const result = reviewsSlice.reducer(state, { type: fetchReviews.fulfilled.type, payload: fakeReviews, });

    expect(result).toEqual(expectedState);
  });

  it('fetchReviewsAction rejected', () => {
    const expectedState: ReviewsProcess = { ...initialState, reviewsIsLoading: false, reviewsIsNotFound: true };
    const actualState: ReviewsProcess = { ...initialState, reviewsIsLoading: true, reviewsIsNotFound: false };

    const result = reviewsSlice.reducer(actualState, { type: fetchReviews.rejected.type });

    expect(result).toEqual(expectedState);
  });
});
