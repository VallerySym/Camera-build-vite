import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "CatalogPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    const expectedText = 'Каталог фото- и видеотехники';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "camera/id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Product);

    render(withStoreComponent);

    const expectedText = 'Похожие товары';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to "/basket"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);

    const expectedText = 'Корзина';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    const link: HTMLAnchorElement = screen.getByTestId('back-home');
    const expectedText = 'Вернуться на главную страницу';

    expect(link.href).toContain(AppRoute.Catalog);
    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
