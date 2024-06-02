import { useForm } from 'react-hook-form';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeCallMePopup, setFormTel } from '../../store/popup-process/popup-process.slice';
import { getPopupTel } from '../../store/popup-process/popup-process.selectors';
import { postFormData } from '../../store/api-actions';
import { CameraItem } from '../../types/camera-item';
import { useCallback, useEffect, useRef } from 'react';

type FormValues = {
  tel: string;
}

type PopupCallItemProps ={
  selectedCamera: CameraItem | null;
}

function PopupCallItem({selectedCamera}:PopupCallItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement | null>(null);

  const formData :string = useAppSelector(getPopupTel);

  const { register, formState: { errors, isValid }, reset } = useForm<FormValues>({ mode: 'onChange' });

  const handleSetPhone = (data: string) => {
    dispatch(setFormTel(data));
  };

  const postData = {
    tel: String(formData),
    id: String(selectedCamera?.id),
  };

  const handleSubmit = () => {
    dispatch(postFormData(postData));
    dispatch(closeCallMePopup());
    navigate(AppRoute.Catalog);
    reset();
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeCallMePopup());

      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeCallMePopup());

    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeCallMePopup());

    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (selectedCamera && focusRef.current) {
        focusRef.current.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKeydown);
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKeydown);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCamera, handleEscapeKeydown]);


  return (
    <div className="modal is-active" data-testid="popup-data" tabIndex={0}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${String(selectedCamera?.previewImgWebp)}, /${String(selectedCamera?.previewImgWebp2x)}`}
                  />
                  <img
                    src={selectedCamera?.previewImg}
                    srcSet={`${String(selectedCamera?.previewImg2x)}`}
                    width={140}
                    height={120}
                    alt={selectedCamera?.name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{selectedCamera?.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>{' '}
                    <span className="basket-item__number">{selectedCamera?.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{selectedCamera?.type}</li>
                  <li className="basket-item__list-item">{selectedCamera?.level}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span> {selectedCamera?.price.toLocaleString()} ₽
                </p>
              </div>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">
                Телефон
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  {...register('tel', {
                    required: 'Обязательное поле',
                    pattern: {
                      value: /^(\+7|8)[\d\- ]{9,}$/,
                      message: 'Пожалуйста, введите номер в формате +7(9XX)XXX-XX-XX',
                    }
                  })}
                  type="tel"
                  id="tel"
                  placeholder="Введите ваш номер"
                  onInput={(evt: React.ChangeEvent<HTMLInputElement>) => handleSetPhone(evt.target.value)}
                  tabIndex={0}
                />
                {errors?.tel &&
                <p style={{ color: 'red', margin: 0 }}>
                  {errors.tel.message}
                </p>}
              </label>
              <p className="custom-input__error">Нужно указать номер</p>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                disabled={!isValid}
                onClick={handleSubmit}
                tabIndex={0}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
              Заказать
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCloseButtonClick}
              tabIndex={0}
            >
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

export default PopupCallItem;
