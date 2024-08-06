import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeCamera } from '../../utils/mocks';
import PopupAddItem from './popup-add-item';

describe('Component: PopupAddItem', () => {
  it('should render correctly', () => {
    const mockCameraItem = makeFakeCamera();

    const { withStoreComponent } = withStore(<PopupAddItem selectedCamera={mockCameraItem} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-add-data')).toBeInTheDocument();
  });
});
