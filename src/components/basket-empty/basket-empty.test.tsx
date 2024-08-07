import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen} from '@testing-library/react';
import BasketEmpty from './basket-empty';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Basket Empty', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<BasketEmpty />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
  });
});
