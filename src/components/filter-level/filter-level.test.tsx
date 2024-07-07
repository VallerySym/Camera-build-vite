import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import FilterLevel from './filter-level';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: FilterLevel', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<FilterLevel />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('filter-level')).toBeInTheDocument();
  });
});
