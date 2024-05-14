import { makeFakeReviews } from '../../utils/mocks';
import { NameSpace } from '../../const';
import { ReviewsProcess } from '../../types/state';
import { getReviews, getReviewsIsLoading, getReviewsIsNotFound } from './reviews-process.selectors';
import { RequestStatus } from '../../const';

const fakeReview = makeFakeReviews();

const fakeState: ReviewsProcess = {
  reviews: fakeReview,
  reviewsIsLoading: true,
  reviewsIsNotFound: false,
  reviewRequestStatus: RequestStatus.Idle,
};

let state = { [NameSpace.Reviews]: fakeState };

describe('ReviewsProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Reviews]: { ...fakeState } };
  });

  it('should return "reviews" from state', () => {
    const result = getReviews(state);

    expect(result).toEqual(fakeReview);
  });

  it('should return true reviewsIsLoading status', () => {
    const result = getReviewsIsLoading(state);

    expect(result).toEqual(true);
  });

  it('should return false reviewsIsNotFound status', () => {
    const result = getReviewsIsNotFound(state);

    expect(result).toEqual(false);
  });
});
