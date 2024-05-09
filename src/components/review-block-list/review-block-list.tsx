import ReviewBlockItem from '../review-block-item/review-block-item';

function ReviewBlockList(): JSX.Element {
  return (
    <ul className="review-block__list">
      <ReviewBlockItem />
    </ul>
  );
}

export default ReviewBlockList;
