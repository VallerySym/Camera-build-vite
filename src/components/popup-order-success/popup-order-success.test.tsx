import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import PopupOrderSuccess from './popup-order-success';

describe('Component: PopupOrderSuccess', () => {
  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<PopupOrderSuccess />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-order-success-data')).toBeInTheDocument();
  });
});
