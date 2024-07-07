import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {makeFakeStore } from '../../utils/mocks';
import { datatype, } from 'faker';
import { withHistory, withStore } from '../../utils/mock-component';
import { PaginationItem } from './pagination-item';

describe('Component: PaginationItem', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<PaginationItem pageNumber={datatype.number()} />,mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('pagination-item')).toBeInTheDocument();
  });
});
