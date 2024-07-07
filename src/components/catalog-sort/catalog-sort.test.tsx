import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import CatalogSort from './catalog-sort';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const expectedSortingText = 'Сортировать:';
    const expectedPriceText = 'по цене';
    const expectedPopularText = 'по популярности';
    const expectedUpText = 'По возростанию';
    const expectedDownText = 'По убыванию';

    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<CatalogSort />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedSortingText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedPopularText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedUpText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedDownText)).toBeInTheDocument();
  });
});

