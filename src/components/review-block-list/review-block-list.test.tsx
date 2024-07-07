import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewBlockList from './review-block-list';
import { makeFakeStore, makeFakeReviews } from '../../utils/mocks';
import { TIME_TO_RENDER_PAGE } from '../../const';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = makeFakeReviews();
    const mockStore = makeFakeStore();
    const expectedHeaderText = 'Отзывы';
    const expectedTest = 'reviews_list';
    const expectedItemTest = 'reviews_item';
    const expectedReviewsQuantity = mockReviews.length;

    const { withStoreComponent } = withStore(<ReviewBlockList reviewList ={mockReviews} />, mockStore);
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
