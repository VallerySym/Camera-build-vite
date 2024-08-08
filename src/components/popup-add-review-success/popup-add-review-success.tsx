import FocusLock from 'react-focus-lock';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAddReviewSuccessPopup } from '../../store/popup-process/popup-process.slice';
import { checkAddReviewSuccessPopupOpen } from '../../store/popup-process/popup-process.selectors';

function PopupAddReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement | null>(null);
  let isAddReviewSuccessPopupOpen = useAppSelector(checkAddReviewSuccessPopupOpen);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeAddReviewSuccessPopup());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(closeAddReviewSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(closeAddReviewSuccessPopup());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {

    if (isAddReviewSuccessPopupOpen) {
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
      isAddReviewSuccessPopupOpen = false;
    };
  }, [handleEscapeKeydown]);

  const handleCatalogNavigate = () => {
    dispatch(closeAddReviewSuccessPopup());
    navigate(AppRoute.Catalog);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="is-active modal modal--narrow" data-testid='popup-add-review-success-data' tabIndex={0} >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} />
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзы</p>
            <svg className="modal__icon" width={86} height={80} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleCatalogNavigate}
              >
                Вернуться к покупкам
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
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

export default PopupAddReviewSuccess;
