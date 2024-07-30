import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
