import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReviewBlockList from '../../components/review-block-list/review-block-list';
import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import { fetchCamera, fetchReviews } from '../../store/api-actions';
import { store } from '../../store';
import { getReviews } from '../../store/reviews-process/reviews-process.selectors';
import { getCamera, getCameraIsLoading, getCameraIsNotFound } from '../../store/product-process/product-process.selectors';
import { AppRoute } from '../../const';
import { getSimilarCameras } from '../../store/similar-cameras-process/similar-cameras-process.selectors';
import SimilarCamerasList from '../../components/similar-cameras-list/similar-cameras-list';
import { checkAddItemPopupOpen, checkSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import PopupSuccess from '../../components/popup-success/popup-success';


function ProductPage(): JSX.Element {
  const params = useParams();
  const cameraId = params.id;

  const reviewsActive = useAppSelector(getReviews);
  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const cameraIsLoading = useAppSelector(getCameraIsLoading);
  const cameraIsNotFound = useAppSelector(getCameraIsNotFound);
  const isAddItemPopupOpen = useAppSelector(checkAddItemPopupOpen);
  const isSuccessPopupOpen = useAppSelector(checkSuccessPopupOpen);

  useEffect(() => {
    store.dispatch(fetchCamera(Number(cameraId)));
    store.dispatch(fetchReviews(Number(cameraId)));
  }, [cameraId]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content" data-testid="camera-item">
          <BreadcrumbsList />
          {cameraIsLoading && <Spinner />}
          {cameraIsNotFound && <Navigate to={AppRoute.NotFound} />}
          <div className="page-content__section">
            <ProductCard selectedCamera={camera} />
          </div>
          <SimilarCamerasList similarList={similarCameras}/>
          <div className="page-content__section">
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3" data-testid="reviews">Отзывы</h2>
                </div>
                <ReviewBlockList reviewList={reviewsActive} />
              </div>
            </section>
          </div>
        </div>
        {isAddItemPopupOpen && <PopupAddItem selectedCamera={camera} />}
        {isSuccessPopupOpen && <PopupSuccess /> }
      </main>
      <a
        className="up-btn"
        onClick={scrollToTop}
      >
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer />
    </div>

  );
}

export default ProductPage;
