import Banner from '../../components/banner/banner';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import CatalogList from '../../components/catalog-list/catalog-list';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getCameras, getCamerasIsLoading } from '../../store/catalog-process/catalog-process.selectors';
import PopupCallItem from '../../components/popup-call-item/popup-call-item';
import { checkPopupOpen } from '../../store/popup-process/popup-process.selectors';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasIsLoading = useAppSelector(getCamerasIsLoading);

  const camerasCount = cameras.length;
  const isPopupOpen = useAppSelector(checkPopupOpen);

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
                {camerasCount ? (
                  <CatalogList catalogList={cameras} />
                ) : (
                  <h2>Нет доступных камер</h2>
                )}
              </div>
            </div>
          </section>
        </div>
        {isPopupOpen && <PopupCallItem />}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
