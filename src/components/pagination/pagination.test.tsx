import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import Pagination from './pagination';
import { datatype, } from 'faker';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<Pagination totalCountPage={datatype.number()} />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
