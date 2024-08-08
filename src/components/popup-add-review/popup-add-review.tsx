import FocusLock from 'react-focus-lock';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { submitReviewsAction } from '../../store/api-actions';
import { getCamera } from '../../store/product-process/product-process.selectors';
import { MAX_VALUE_RATING, MIN_VALUE_RATING, ReviewTextLength, ReviewNameLength } from '../../const';
import { checkAddReviewPopupOpen, getErrorAddReview } from '../../store/popup-process/popup-process.selectors';
import { closeAddReviewPopup, openAddReviewSuccessPopup } from '../../store/popup-process/popup-process.slice';

function PopupAddReview(): JSX.Element {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const cameraData = useAppSelector(getCamera);
  const errorAddReview = useAppSelector(getErrorAddReview);

  const [userRating, setUserRating] = useState(0);
  const focusRef = useRef<HTMLDivElement | null>(null);
  let isAddReviewPopupOpen = useAppSelector(checkAddReviewPopupOpen);

  const reviewRating = [
    { value: 5, title: 'Отлично' },
    { value: 4, title: 'Хорошо' },
    { value: 3, title: 'Нормально' },
    { value: 2, title: 'Плохо' },
    { value: 1, title: 'Ужасно' }
  ];

  const handleRatingChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    setUserRating(value);
  };

  const handleReviewFormSubmit: SubmitHandler<FieldValues> = (selectedCamera) => {
    const { rating } = selectedCamera;
    selectedCamera.rating = Number(rating);
    selectedCamera.cameraId = cameraData?.id;
    dispatch(submitReviewsAction(selectedCamera));
    if (!errorAddReview) {
      dispatch(closeAddReviewPopup());
      dispatch(openAddReviewSuccessPopup());
    }
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeAddReviewPopup());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeAddReviewPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeAddReviewPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {

    if (isAddReviewPopupOpen) {
      if (focusRef.current) {
        focusRef.current.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKeydown);
      }

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscapeKeydown);
      };
    }
    return () => {
      isAddReviewPopupOpen = false;
    };
  }, [handleEscapeKeydown]);

  return (
    <div className="modal is-active" data-testid='popup-add-review-data'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form
                method="post"
                onSubmit={(event) => void handleSubmit(handleReviewFormSubmit)(event)}
              >
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item is-invalid">
                    <legend className="rate__caption">
                      Рейтинг
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {reviewRating.map((rating) => (
                          <Fragment key={rating.title}>
                            <input
                              className="visually-hidden"
                              id={`star-${rating.value}`}
                              type="radio"
                              defaultValue={rating.value}
                              data-testid={`rating_${rating.value}_value`}
                              {...register('rating', {
                                required: true,
                                minLength: MIN_VALUE_RATING,
                                maxLength: MAX_VALUE_RATING,
                              })}
                              onChange={handleRatingChange}
                              aria-invalid={errors.rate ? 'true' : 'false'}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${rating.value}`}
                              title={rating.title}
                            />
                          </Fragment>
                        ))}
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">{userRating}</span> <span>/</span>{' '}
                        <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    {(errors.rating && userRating === 0) &&
                      <p className="rate__message">Нужно оценить товар</p>}
                  </fieldset>
                  <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Введите ваше имя"
                        autoFocus
                        data-testid='username_value'
                        {...register('userName', {
                          required: true,
                          minLength: ReviewNameLength.Min,
                          maxLength: ReviewNameLength.Max,
                        })}
                        aria-invalid={errors.userName ? 'true' : 'false'}
                      />
                    </label>
                    {errors.userName?.type === 'required' && <><br /><p className="custom-input__error">Нужно указать имя</p></>}
                    {errors.userName?.type === 'minLength' && <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextLength.Min}</p></>}
                    {errors.userName?.type === 'maxLength' && <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextLength.Max}</p></>}
                  </div>
                  <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Основные преимущества товара"
                        data-testid='advantage_value'
                        {...register('advantage', {
                          required: true,
                          minLength: ReviewTextLength.Min,
                          maxLength: ReviewTextLength.Max,
                        })}
                        aria-invalid={errors.advantage ? 'true' : 'false'}
                      />
                    </label>
                    {errors.advantage?.type === 'required' &&
                      <><br /><p className="custom-input__error">Нужно указать достоинства</p></>}
                    {errors.advantage?.type === 'minLength' &&
                      <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextLength.Min}</p></>}
                    {errors.advantage?.type === 'maxLength' &&
                      <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextLength.Max}</p></>}
                  </div>
                  <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Главные недостатки товара"
                        data-testid='disadvantage_value'
                        {...register('disadvantage', {
                          required: true,
                          minLength: ReviewTextLength.Min,
                          maxLength: ReviewTextLength.Max,
                        })}
                        aria-invalid={errors.disadvantage ? 'true' : 'false'}
                      />
                    </label>
                    {errors.disadvantage?.type === 'required' &&
                      <><br /><p className="custom-input__error">Нужно указать недостатки</p></>}
                    {errors.disadvantage?.type === 'minLength' &&
                      <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextLength.Min}</p></>}
                    {errors.disadvantage?.type === 'maxLength' &&
                      <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextLength.Max}</p></>}
                  </div>
                  <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        defaultValue={''}
                        data-testid='review_value'
                        {...register('review', {
                          required: true,
                          minLength: ReviewTextLength.Min,
                          maxLength: ReviewTextLength.Max,
                        })}
                        aria-invalid={errors.review ? 'true' : 'false'}
                      />
                    </label>
                    {errors.review?.type === 'required' && <><br /><div className="custom-input__error">Нужно добавить комментарий</div></>}
                    {errors.review?.type === 'minLength' && <><br /><div className="custom-input__error">Миниальное количество символов {ReviewTextLength.Min}</div></>}
                    {errors.review?.type === 'maxLength' && <><br /><div className="custom-input__error">Максимальное количество символов {ReviewTextLength.Max}</div></>}
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">
                  Отправить отзыв
                </button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </FocusLock>
      </div>
    </div>
  );
}


export default PopupAddReview;
