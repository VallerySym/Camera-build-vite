import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import CatalogFilter from './catalog-filter';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const expectedText = 'Фильтр';

    const { withStoreComponent } = withStore(<CatalogFilter />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
    expect(screen.getByTestId('filter-category')).toBeInTheDocument();
    expect(screen.getByTestId('filter-level')).toBeInTheDocument();
    expect(screen.getByTestId('filter-type')).toBeInTheDocument();
    expect(screen.getByTestId('filter-price')).toBeInTheDocument();
  });
});
