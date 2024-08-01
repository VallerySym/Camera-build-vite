import FocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { closeAddItemPopup, openSuccessPopup } from '../../store/popup-process/popup-process.slice';
import { CameraItem } from '../../types/camera-item';
import { useCallback, useEffect, useRef } from 'react';
import { addItem } from '../../store/basket-process/basket-process.slice';

type PopupAddItemProps = {
    selectedCamera: CameraItem;

}

function PopupAddItem({ selectedCamera }: PopupAddItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const focusRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    dispatch(addItem(selectedCamera));
    dispatch(closeAddItemPopup());
    dispatch(openSuccessPopup());
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeAddItemPopup());

      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeAddItemPopup());

    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeAddItemPopup());

    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {
    let isMounted;

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
            <p className="title title--h4">Добавить товар в корзину</p>
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
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleSubmit}
                tabIndex={0}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                                Добавить в корзину
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

export default PopupAddItem;
