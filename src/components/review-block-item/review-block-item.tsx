import { Review } from '../../types/review';
import { stars } from '../../const';
import dayjs from 'dayjs';

type ReviewProps = {
  reviewCard: Review;
}

function ReviewBlockItem({ reviewCard }: ReviewProps): JSX.Element {
  const { userName, advantage, disadvantage, review, rating, createAt } = reviewCard;
  const getReviewDate = (date: Review['createAt']): string => dayjs(date).locale('ru').format('DD MMMM');
  const getReviewDateTime = (date: Review['createAt']): string =>dayjs(date).format('YYYY-MM-DD');

  return (
    <li className="review-card" data-testid="review-block-item">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time 
        className="review-card__data"
        dateTime={getReviewDateTime(createAt)}
         >
        {getReviewDate(createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        {stars.map((star) => (
          <svg key={star} width={17} height={16} aria-hidden="true">
            {star <= Math.floor(rating) ? (
              <use xlinkHref="#icon-full-star" />
            ) : (
              <use xlinkHref="#icon-star" />
            )}
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewBlockItem;
