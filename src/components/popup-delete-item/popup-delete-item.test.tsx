import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeCamera } from '../../utils/mocks';
import PopupDeleteItem from './popup-delete-item';

describe('Component: PopupDeleteItem', () => {
  it('should render correctly', () => {
    const mockCameraItem = makeFakeCamera();

    const { withStoreComponent } = withStore(<PopupDeleteItem selectedCamera={mockCameraItem} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-delete-item-data')).toBeInTheDocument();
  });
});
