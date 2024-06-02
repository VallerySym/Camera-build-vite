import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeCamera } from '../../utils/mocks';
import PopupCallItem from './popup-call-item';

describe('Component: PopupCallItem', () => {
  it('should render correctly', () => {
    const mockCameraItem = makeFakeCamera();

    const { withStoreComponent } = withStore(<PopupCallItem selectedCamera={mockCameraItem} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('popup-data')).toBeInTheDocument();
  });
});
