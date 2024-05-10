import { useEffect } from 'react';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReviewBlockList from '../../components/review-block-list/review-block-list';
import ReviewButton from '../../components/review-button/review-button';
import { useParams } from 'react-router-dom';
import { fetchCamera, fetchReviewsAction } from '../../store/api-actions';
import { store } from '../../store';
import ProductCard from '../../components/product-card/product-card';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/reviews-process/reviews-process.selectors';

function ProductPage(): JSX.Element {
  const params = useParams();
  const cameraId = params.id;
  const reviewsActive = useAppSelector(getReviews);

  useEffect(() => {
    store.dispatch(fetchCamera(cameraId));
    store.dispatch(fetchReviewsAction(cameraId));
  }, [cameraId]);

  console.log()
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadcrumbsList />
          <div className="page-content__section">
            <ProductCard />
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                </div>
                <ReviewBlockList  reviewList={reviewsActive} />
                <div className="review-block__buttons">
                  <ReviewButton />
                </div>
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
