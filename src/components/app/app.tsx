import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {

  return (
    <HelmetProvider>
        <Routes>
          <Route
            path={AppRoute.Catalog}
            element={<CatalogPage />}
          />
        </Routes>
        <Routes>
          <Route
            path={AppRoute.Product}
            element={<ProductPage />}
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
