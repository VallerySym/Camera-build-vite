import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import PopupAddReview from './popup-add-review';

describe('Component: PopupAddReview', () => {
  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<PopupAddReview />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-add-review-data')).toBeInTheDocument();
  });
});
