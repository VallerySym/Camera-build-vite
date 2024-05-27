import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BreadcrumbsList from './breadcrumbs-list';
import { testInitialState } from '../../store/catalog-process/catalog-process.slice';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const expectedTest = 'breadcrumbs';
    const expectedLinkText = 'Главная';
    const { withStoreComponent } = withStore(<BreadcrumbsList />, {
      Cameras: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});