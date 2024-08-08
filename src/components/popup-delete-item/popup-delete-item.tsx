import FocusLock from 'react-focus-lock';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CameraItem } from '../../types/camera-item';
import { closeDeleteItemPopup } from '../../store/popup-process/popup-process.slice';
import { deleteAllItems } from '../../store/basket-process/basket-process.slice';
import { checkDeleteItemPopupOpen } from '../../store/popup-process/popup-process.selectors';

type PopupDeleteItemProps = {
  selectedCamera: CameraItem | null;
}

function PopupDeleteItem({ selectedCamera }: PopupDeleteItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement | null>(null);
  let isDeleteItemPopupOpen = useAppSelector(checkDeleteItemPopupOpen);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeDeleteItemPopup());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeDeleteItemPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeDeleteItemPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleCatalogNavigate = () => {
    dispatch(closeDeleteItemPopup());
    navigate(AppRoute.Catalog);
  };

  const handleButtonItemDelete = () => {
    dispatch(deleteAllItems(Number(selectedCamera?.id)));
    dispatch(closeDeleteItemPopup());
  };

  useEffect(() => {

    if (isDeleteItemPopupOpen) {
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
      isDeleteItemPopupOpen = false;
    };
  }, [ handleEscapeKeydown]);


  return (
    <div className="modal is-active" data-testid="popup-delete-item-data" tabIndex={0}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
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
                  <li className="basket-item__list-item">{selectedCamera?.type} </li>
                  <li className="basket-item__list-item">{selectedCamera?.level}</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleButtonItemDelete}
              >
                Удалить
              </button>
              <a
                className="btn btn--transparent modal__btn modal__btn--half-width"
                href="#"
                onClick={handleCatalogNavigate}
              >
                Продолжить покупки
              </a>
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

export default PopupDeleteItem;
