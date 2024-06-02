import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeCameras, makeFakeStore } from '../../utils/mocks';
import CatalogItem from './catalog-item';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: CatalogItem', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCameras()[0];
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<CatalogItem catalogItem={mockCamera} />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-card')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
