import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeReview, makeFakeReviews } from '../../utils/mocks';
import ReviewBlockItem from './review-block-item';

describe('Component: ReviewBlockItem', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const mockReviews = makeFakeReviews();
    const { withStoreComponent } = withStore(
      <ReviewBlockItem reviewCard={mockReview} />,
      {
        REVIEWS: {
          reviews: mockReviews,
          reviewsIsLoading: true,
          reviewsIsNotFound: false,
          reviewRequestStatus: RequestStatus.Success,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('review-block-item')).toBeInTheDocument();
    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
  });

});
