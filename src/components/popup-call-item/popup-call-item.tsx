import { useForm } from 'react-hook-form';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamera } from '../../store/product-process/product-process.selectors';
import { closeCallMePopup, setFormTel } from '../../store/popup-process/popup-process.slice';
import { checkPopupOpen, getPopupTel } from '../../store/popup-process/popup-process.selectors';
import { postFormData } from '../../store/api-actions';
import { useScrollLock } from '../../hooks/use-scroll-lock';

type FormValues = {
  tel: string;
}

function PopupCallItem(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedCamera = useAppSelector(getCamera);
  const formData = useAppSelector(getPopupTel);
  const isPopupOpen = useAppSelector(checkPopupOpen);

  const { register, formState: { errors, isValid }, reset } = useForm<FormValues>({ mode: 'onChange' });

  const handleSetPhone = (data: string) => {
    dispatch(setFormTel(data));
  };

  const postData = {
    tel: String(formData),
    id: selectedCamera?.id,
  };

  const handleSubmit = () => {
    dispatch(postFormData(postData));
    dispatch(closeCallMePopup());
    navigate(AppRoute.Catalog);
    reset();
  };

  useScrollLock(isPopupOpen);

  return (
    <div className="modal is-active" data-testid="popup-data">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${selectedCamera?.previewImgWebp}, /${selectedCamera?.previewImgWebp2x}`}
                />
                <img
                  src={selectedCamera?.previewImg}
                  srcSet={`${selectedCamera?.previewImg2x}`}
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
            onClick={() => {
              dispatch(closeCallMePopup());
            }}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

export default PopupCallItem;
