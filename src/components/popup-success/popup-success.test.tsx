import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import PopupSuccess from './popup-success';

describe('Component: PopupSuccess', () => {
  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<PopupSuccess />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-success-data')).toBeInTheDocument();
  });
});
