
import { useAppDispatch } from '../../hooks';
import { closeCallMePopup } from '../../store/popup-process/popup-process.slice';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import classnames from 'classnames';

type PopupSuccessProps = {
    isActive: boolean;
    setIsModalActive: (arg: boolean) => void;
}

function PopupSuccess({ isActive, setIsModalActive }: PopupSuccessProps): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const focusRef = useRef<HTMLDivElement | null>(null);

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
            if ( focusRef.current) {
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
    }, [ handleEscapeKeydown]);

    const handleBasketNavigate = () => {
        navigate(AppRoute.Basket);
        setIsModalActive(false);
    };


    return (
        <div className={classnames({'is-active': isActive}, 'modal', 'modal--narrow')} tabIndex={0} >
            <div className="modal__wrapper">
                <div className="modal__overlay" onClick={handleOverlayClick}/>
                <div className="modal__content">
                    <p className="title title--h4">Товар успешно добавлен в корзину</p>
                    <svg className="modal__icon" width={86} height={80} aria-hidden="true">
                        <use xlinkHref="#icon-success" />
                    </svg>
                    <div className="modal__buttons">
                        <Link
                            className="btn btn--transparent modal__btn"
                            to={AppRoute.Catalog}
                        >
                            Продолжить покупки
                        </Link>
                        <button
                            className="btn btn--purple modal__btn modal__btn--fit-width"
                            onClick={handleBasketNavigate}
                        >
                            Перейти в корзину
                        </button>
                    </div>
                    <button className="cross-btn" type="button" aria-label="Закрыть попап"
                        onClick={handleCloseButtonClick}>
                        <svg width={10} height={10} aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

    );
}

export default PopupSuccess;
