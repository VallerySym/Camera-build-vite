import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(<Header />,mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
