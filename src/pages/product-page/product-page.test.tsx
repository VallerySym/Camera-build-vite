import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../utils/mocks';
import ProductPage from './product-page';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, RequestStatus } from '../../const';

describe('Component: ProductPage', () => {
  const mockCamerasList = makeFakeCameras();
  const mockCameraItem = makeFakeCamera();
  const mockReviews = makeFakeReviews();

  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<ProductPage />, {
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
        camera: { ...mockCameraItem },
        cameraIsLoading: false,
        cameraIsNotFound: false,
      },
      REVIEWS: {
        reviews: [...mockReviews],
        reviewsIsLoading: false,
        reviewsIsNotFound: false,
        reviewRequestStatus: RequestStatus.Idle,
      },
      PROMO: {
        promoCameras: [],
        promoCamerasIsLoading: false,
        promoCamerasIsNotFound: false,
      },
      POPUP: {
        postData: {
          tel: '',
          id: '',
        },
        isPopupOpen: false,
        isPopupCallMeOpen: false,
        popupCallIsLoading: false,
        popupCallIsNotFound: false,
      },
      SIMILAR: {
        similarCameras: [],
        similarCameraIsLoading: false,
        similarCameraIsNotFound: false,
      },
      BASKET: {
        items: [],
        discount: 0,
        promoCode: null,
        hasError: false,
        isPromoCodeValid: false,
        basketStatus: RequestStatus.Idle,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-item')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
