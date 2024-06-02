import { stars } from '../../const';
import { CameraItem } from '../../types/camera-item';
import { CSSProperties } from 'react';
import { useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';
import { openCallMePopup } from '../../store/popup-process/popup-process.slice';

type SimilarCameraProps = {
  similarCamera: CameraItem;
  style: CSSProperties;
}

function SimilarCamera({ similarCamera, style}: SimilarCameraProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card is-active" style={style}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${similarCamera?.previewImgWebp}, /${similarCamera?.previewImgWebp2x}`}
          />
          <img
            src={similarCamera?.previewImg}
            srcSet={`${similarCamera?.previewImg2x}`}
            width={280}
            height={240}
            alt={`Фотоаппарат ${similarCamera.name}`}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {stars.map((star) => (
            <svg key={star} width={17} height={16} aria-hidden="true">
              {star <= Math.floor(similarCamera.rating) ? (
                <use xlinkHref="#icon-full-star" />
              ) : (
                <use xlinkHref="#icon-star" />
              )}
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {similarCamera.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{similarCamera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">{similarCamera?.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{similarCamera?.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => {
            dispatch(openCallMePopup());
          }}
        >
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={`/camera/${similarCamera.id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default SimilarCamera;
