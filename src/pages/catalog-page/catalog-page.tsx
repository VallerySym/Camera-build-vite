import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import CatalogList from '../../components/catalog-list/catalog-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog-process/catalog-process.selectors';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Catalog.</title>
      </Helmet>
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
                <CatalogList catalogList={cameras} />
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
