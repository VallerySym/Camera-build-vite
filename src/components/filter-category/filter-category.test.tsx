import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import FilterCategory from './filter-category';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: FilterCategory', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<FilterCategory />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('filter-category')).toBeInTheDocument();

  });
});
