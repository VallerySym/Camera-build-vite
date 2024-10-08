import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeCamera, makeFakeStore } from '../../utils/mocks';

describe('Component: BasketItem', () => {
  const mockStore = makeFakeStore();
  const mockCameraItem = makeFakeCamera();
  const {name, type} = mockCameraItem;

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <BasketItem item={{...mockCameraItem, count: 1}} setCamera={() => mockCameraItem} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(`${type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByAltText(`Фотоаппарат ${name}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
