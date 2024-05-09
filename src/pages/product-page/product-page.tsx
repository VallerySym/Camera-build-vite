import { Helmet } from 'react-helmet-async';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductCard from '../../components/product-card/product-card';
import ReviewBlockList from '../../components/review-block-list/review-block-list';
import ReviewButton from '../../components/review-button/review-button';

function ProductPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Product.</title>
      </Helmet>
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
                <ReviewBlockList />
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
