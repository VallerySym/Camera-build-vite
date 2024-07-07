import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import SearchForm from './search-form';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Search Form', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<SearchForm />,mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
