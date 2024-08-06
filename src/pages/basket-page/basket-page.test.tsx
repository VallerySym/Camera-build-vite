import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCameras } from '../../utils/mocks';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, RequestStatus } from '../../const';
import BasketPage from './basket-page';

describe('Component: BasketPage', () => {
  const mockCamerasList = makeFakeCameras();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<BasketPage />, {
      CAMERAS: {
        cameras: [...mockCamerasList],
        camerasIsLoading: true,
        camerasIsNotFound: false,
        selectCameraId: '',
        sortType: DEFAULT_SORT_TYPE,
        sortOrder: DEFAULT_SORT_ORDER,
        category: null,
        type: [],
        level: [],
        minPrice: 0,
        maxPrice: 0,
        isResetFilters: false,
        currentPage: 1,
      },
      CAMERA: {
        camera: null,
        cameraIsLoading: false,
        cameraIsNotFound: false,
      },
      BASKET: {
        items: [],
        discount: 0,
        discountPercent: 0,
        promoCode: null,
        hasError: false,
        isPromoCodeValid: false,
        basketStatus: RequestStatus.Idle,
      },
      POPUP: {
        isAddItemPopupOpen:false,
        isSuccessPopupOpen:false,
        isDeleteItemPopupOpen:false,
        isOrderSuccessPopupOpen:false,
        isAddReviewPopupOpen:false,
        isAddReviewSuccessPopupOpen:false,
        errorAddReview: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });
});
