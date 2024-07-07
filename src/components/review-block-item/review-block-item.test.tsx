import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeReview, makeFakeStore } from '../../utils/mocks';
import ReviewBlockItem from './review-block-item';

describe('Component: ReviewBlockItem', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(
      <ReviewBlockItem reviewCard={mockReview} />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('review-block-item')).toBeInTheDocument();
    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
  });

});
