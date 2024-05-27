import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewBlockList from './review-block-list';
import { makeFakeReview } from '../../utils/mocks';
import { TIME_TO_RENDER_PAGE } from '../../const';
import { RequestStatus } from '../../const';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const expectedHeaderText = 'Отзывы';
    const expectedTest = 'reviews_list';
    const expectedItemTest = 'reviews_item';
    const expectedReviewsQuantity = mockReviews.length;
    const { withStoreComponent } = withStore(<ReviewBlockList reviewList ={mockReviews} />, {
      REVIEWS: {
        reviews: mockReviews,
        reviewsIsLoading: true,
        reviewsIsNotFound: false,
        reviewRequestStatus: RequestStatus.Success,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getAllByTestId(expectedItemTest)).toBe(expectedReviewsQuantity);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
