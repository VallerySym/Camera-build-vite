import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import FilterPrice from './filter-price';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: FilterPrice', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<FilterPrice />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('filter-price')).toBeInTheDocument();
  });
});
