import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import FilterType from './filter-type';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: FilterType', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<FilterType />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('filter-type')).toBeInTheDocument();

  });
});
