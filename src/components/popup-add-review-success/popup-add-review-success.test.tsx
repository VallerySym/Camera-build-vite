import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import PopupAddReviewSuccess from './popup-add-review-success';

describe('Component: PopupAddReviewSuccess', () => {
  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<PopupAddReviewSuccess />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-add-review-success-data')).toBeInTheDocument();
  });
});
