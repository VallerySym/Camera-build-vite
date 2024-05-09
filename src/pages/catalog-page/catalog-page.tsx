import { Navigate } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import { AppRoute } from '../../const';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import CatalogList from '../../components/catalog-list/catalog-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getCameras, getCamerasIsLoading, getCamerasIsNotFound } from '../../store/catalog-process/catalog-process.selectors';
import Spinner from '../../components/spinner/spinner';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasIsLoading = useAppSelector(getCamerasIsLoading)
  const camerasIsNotFound = useAppSelector(getCamerasIsNotFound)
  const camerasCount = cameras.length;

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <BreadcrumbsList />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                </div>
                {camerasIsLoading && <Spinner />}
                {camerasIsNotFound && <Navigate to={AppRoute.NotFound} />}
                {camerasCount ? (
                  <CatalogList catalogList={cameras} />
                ) : (
                  <h2>Нет доступных камер</h2>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
