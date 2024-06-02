import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore, makeFakeCamera } from '../../utils/mocks';
import ProductCard from './product-card';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const mockCamera = makeFakeCamera();

    const { withStoreComponent } = withStore(<ProductCard selectedCamera={mockCamera}/>,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();

  });
});
