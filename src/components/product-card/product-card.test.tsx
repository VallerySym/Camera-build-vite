import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import ProductCard from './product-card';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <ProductCard />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();

  });
});
