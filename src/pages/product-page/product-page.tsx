import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReviewBlockList from '../../components/review-block-list/review-block-list';
import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import SimilarCamerasList from '../../components/similar-cameras-list/similar-cameras-list';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import PopupSuccess from '../../components/popup-success/popup-success';
import PopupAddReview from '../../components/popup-add-review/popup-add-review';
import PopupAddReviewSuccess from '../../components/popup-add-review-success/popup-add-review-success';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamera, fetchReviews } from '../../store/api-actions';
import { getReviews } from '../../store/reviews-process/reviews-process.selectors';
import { getCamera, getCameraIsLoading, getCameraIsNotFound } from '../../store/product-process/product-process.selectors';
import { AppRoute } from '../../const';
import { getSimilarCameras } from '../../store/similar-cameras-process/similar-cameras-process.selectors';
import { openAddReviewPopup } from '../../store/popup-process/popup-process.slice';
import {
  checkAddItemPopupOpen, checkAddReviewPopupOpen,
  checkAddReviewSuccessPopupOpen, checkSuccessPopupOpen
} from '../../store/popup-process/popup-process.selectors';


function ProductPage(): JSX.Element {
  const params = useParams();
  const cameraId = params.id;

  const reviewsActive = useAppSelector(getReviews);
  const dispatch = useAppDispatch();

  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const cameraIsLoading = useAppSelector(getCameraIsLoading);
  const cameraIsNotFound = useAppSelector(getCameraIsNotFound);

  const isAddItemPopupOpen = useAppSelector(checkAddItemPopupOpen);
  const isSuccessPopupOpen = useAppSelector(checkSuccessPopupOpen);
  const isAddReviewPopupOpen = useAppSelector(checkAddReviewPopupOpen);
  const isAddReviewSuccessPopupOpen = useAppSelector(checkAddReviewSuccessPopupOpen);

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

  const onAddReviewButtonClick = () => {
    dispatch(openAddReviewPopup());
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content" data-testid="product-page">
          <BreadcrumbsList />
          {cameraIsLoading && <Spinner />}
          {cameraIsNotFound && <Navigate to={AppRoute.NotFound} />}
          <div className="page-content__section">
            <ProductCard selectedCamera={camera} />
          </div>
          <SimilarCamerasList similarList={similarCameras} />
          <div className="page-content__section">
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3" data-testid="reviews">Отзывы</h2>
                  <button
                    className="btn"
                    type="button"
                    onClick={onAddReviewButtonClick}
                  >
                    Оставить свой отзыв
                  </button>
                </div>
                <ReviewBlockList reviewList={reviewsActive} />

              </div>
            </section>
          </div>
        </div>
        {isAddItemPopupOpen && <PopupAddItem selectedCamera={camera} />}
        {isSuccessPopupOpen && <PopupSuccess />}
        {isAddReviewPopupOpen && <PopupAddReview />}
        {isAddReviewSuccessPopupOpen && <PopupAddReviewSuccess />}
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
