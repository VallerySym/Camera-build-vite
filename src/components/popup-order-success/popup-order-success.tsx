import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeOrderSuccessPopup } from '../../store/popup-process/popup-process.slice';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { checkOrderSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';
import FocusLock from 'react-focus-lock';

function PopupOrderSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement | null>(null);
  let isOrderSuccessPopupOpen = useAppSelector(checkOrderSuccessPopupOpen);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeOrderSuccessPopup());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeOrderSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeOrderSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {

    if (isOrderSuccessPopupOpen) {
      if (focusRef.current) {
        focusRef.current.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKeydown);
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKeydown);
      };
    }
    return () => {
      isOrderSuccessPopupOpen = false;
    };
  }, [handleEscapeKeydown]);

  const handleCatalogNavigate = () => {
    dispatch(closeOrderSuccessPopup());
    navigate(AppRoute.Catalog);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="is-active modal modal--narrow" data-testid="popup-order-success-data" tabIndex={0} >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width={86} height={80} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <a
                className="btn btn--transparent modal__btn"
                onClick={handleCatalogNavigate}
              >
                Вернуться к покупкам
              </a>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап"
              onClick={handleCloseButtonClick}
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

export default PopupOrderSuccess;
