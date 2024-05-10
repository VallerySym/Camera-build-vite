import { Reviews } from '../../types/review';
import ReviewBlockItem from '../review-block-item/review-block-item';
import { useState } from 'react';

type ReviewBlockListProps = {
  reviewList: Reviews;
};

function ReviewBlockList({ reviewList }: ReviewBlockListProps): JSX.Element {

  const [visibleReviews, setVisibleReviews] = useState(3);
  const reviewsOnFirstLoad = reviewList.slice(0, visibleReviews);

  const handleShowMoreReviews = () => {
    setVisibleReviews((prevCount) => prevCount + 3);
  };

  const isShowMoreVisible = reviewList.length > visibleReviews;

  return (
    <>
      <ul className="review-block__list">
        {reviewsOnFirstLoad.map((review) => {
          const keyValue = review.id;
          return (
            <ReviewBlockItem key={keyValue} reviewCard={review} />
          );
        })}
      </ul>
      <div className="review-block__buttons">
        {isShowMoreVisible && (
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleShowMoreReviews}
          >
            Показать больше отзывов
          </button>
        )}
      </div>
    </>
  );
}

export default ReviewBlockList;
