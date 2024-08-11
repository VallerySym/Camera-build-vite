import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import CatalogList from '../../components/catalog-list/catalog-list';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import SwiperPromo from '../../components/swiper-promo/swiper-promo';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import PopupSuccess from '../../components/popup-success/popup-success';
import { getCamera } from '../../store/product-process/product-process.selectors';
import { QueryParams } from '../../types/query-params';
import { checkAddItemPopupOpen, checkSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';
import {
  getCameras, getCamerasCategory, getCamerasIsLoading, getCamerasLevel,
  getCamerasMaxPrice, getCamerasMinPrice, getCamerasType, getCurrentCamerasList,
  getCurrentPage, getSortOrder, getSortType, getTotalPageCount
} from '../../store/catalog-process/catalog-process.selectors';

function CatalogPage(): JSX.Element {
  const camera = useAppSelector(getCamera);
  const cameras = useAppSelector(getCameras);
  const camerasIsLoading = useAppSelector(getCamerasIsLoading);

  const camerasCount = cameras.length;
  const isAddItemPopupOpen = useAppSelector(checkAddItemPopupOpen);
  const isSuccessPopupOpen = useAppSelector(checkSuccessPopupOpen);

  const filteredAndSortedCameras = useAppSelector(getCurrentCamerasList);

  const totalCountPage = useAppSelector(getTotalPageCount);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const activePage = useAppSelector(getCurrentPage);
  const activeSortType = useAppSelector(getSortType);
  const activeSortOrder = useAppSelector(getSortOrder);
  const activeFilterCategory = useAppSelector(getCamerasCategory);
  const activeFilterType = useAppSelector(getCamerasType);
  const activeFilterLevel = useAppSelector(getCamerasLevel);
  const activeMinPrice = useAppSelector(getCamerasMinPrice);
  const activeMaxPrice = useAppSelector(getCamerasMaxPrice);

  const currentParams = useMemo(() => {
    const params: QueryParams = {};
    if (!currentPage) {
      params.page = activePage.toString();
    }
    if (currentPage) {
      params.page = currentPage.toString();
    }
    if (activeSortType && activeSortOrder) {
      params.sort = activeSortType;
      params.order = activeSortOrder;
    }
    if (activeFilterCategory) {
      params.category = activeFilterCategory;
    }
    if (activeFilterType.length) {
      params.type = activeFilterType;
    }
    if (activeFilterLevel.length) {
      params.level = activeFilterLevel;
    }
    if (activeMinPrice) {
      params['price_min'] = activeMinPrice.toString();
    }
    if (activeMaxPrice) {
      params['price_max'] = activeMaxPrice.toString();
    }
    return params;
  }, [activeFilterCategory, activeFilterLevel, activeFilterType, activeMaxPrice, activeMinPrice, activePage, currentPage, activeSortType, activeSortOrder]);

  useEffect(() => {
    setSearchParams(currentParams);

  }, [setSearchParams, currentParams]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <SwiperPromo />
        <div className="page-content" data-testid="catalog-page">
          <BreadcrumbsList />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {camerasIsLoading && <Spinner />}
                  {camerasCount ? (
                    <CatalogList catalogList={filteredAndSortedCameras} />
                  ) : (
                    <h2>Нет доступных камер</h2>
                  )}
                  {totalCountPage > 1 && <Pagination totalCountPage={totalCountPage} />}
                </div>
              </div>
            </div>
          </section>
        </div>
        {isAddItemPopupOpen && <PopupAddItem selectedCamera={camera} />}
        {isSuccessPopupOpen && <PopupSuccess />}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
