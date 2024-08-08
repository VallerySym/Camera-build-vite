import FocusLock from 'react-focus-lock';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeSuccessPopup } from '../../store/popup-process/popup-process.slice';
import { checkSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';

function PopupSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement | null>(null);
  let isSuccessPopupOpen = useAppSelector(checkSuccessPopupOpen);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeSuccessPopup());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {

    if (isSuccessPopupOpen) {
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
      isSuccessPopupOpen = false;
    };
  }, [handleEscapeKeydown]);

  const handleBasketNavigate = () => {
    dispatch(closeSuccessPopup());
    navigate(AppRoute.Basket);
    document.body.style.overflow = 'unset';
  };

  const handleCatalogNavigate = () => {
    dispatch(closeSuccessPopup());
    navigate(AppRoute.Catalog);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="is-active modal modal--narrow" data-testid="popup-success-data" tabIndex={0} >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width={86} height={80} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <a
                className="btn btn--transparent modal__btn"
                onClick={handleCatalogNavigate}
              >
                Продолжить покупки
              </a>
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                onClick={handleBasketNavigate}
              >
                Перейти в корзину
              </button>
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

export default PopupSuccess;
