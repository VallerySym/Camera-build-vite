import { Reviews } from '../../types/review';
import ReviewBlockItem from '../review-block-item/review-block-item';

type ReviewBlockListProps = {
  reviewList: Reviews;
};


function ReviewBlockList({ reviewList }: ReviewBlockListProps): JSX.Element {
  const MIN_REVIEWS_COUNT = 0;
  const MAX_REVIEWS_COUNT = 3;
  const maxReviews = reviewList.slice(MIN_REVIEWS_COUNT, Math.min(MAX_REVIEWS_COUNT, reviewList.length))

  return (
    <ul className="review-block__list">
      {maxReviews.map((review) => {
        const keyValue = review.id;
        return (
      <ReviewBlockItem key={keyValue} reviewCard={review} />
    );
  })}
    </ul>
  );
}

export default ReviewBlockList;
