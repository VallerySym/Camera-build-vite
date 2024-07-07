import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BreadcrumbsList from './breadcrumbs-list';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: BreadcrumbsList', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const expectedTest = 'breadcrumbs-list';
    const expectedLinkText = 'Главная';
    const { withStoreComponent } = withStore(<BreadcrumbsList />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});

