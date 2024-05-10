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
import { getCameraIsLoading, getCameraIsNotFound } from '../../store/product-process/product-process.selectors';
import { AppRoute } from '../../const';

function ProductPage(): JSX.Element {
  const params = useParams();
  const cameraId = params.id;
  
  const reviewsActive = useAppSelector(getReviews);
  const cameraIsLoading = useAppSelector(getCameraIsLoading);
  const cameraIsNotFound = useAppSelector(getCameraIsNotFound);

  useEffect(() => {
    store.dispatch(fetchCamera(cameraId));
    store.dispatch(fetchReviews(cameraId));
  }, [cameraId]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadcrumbsList />
          {cameraIsLoading && <Spinner />}
          {cameraIsNotFound && <Navigate to={AppRoute.NotFound} />}
          <div className="page-content__section">
            <ProductCard />
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                </div>
                <ReviewBlockList reviewList={reviewsActive} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer />
    </div>

  );
}

export default ProductPage;
