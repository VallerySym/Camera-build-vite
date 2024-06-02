import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeReviews } from '../../utils/mocks';
import ProductPage from './product-page';
import { RequestStatus } from '../../const';

describe('Component: ProductPage', () => {
  const mockCameraItem = makeFakeCamera();
  const mockReviews = makeFakeReviews();

  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<ProductPage />, {
      CAMERAS: {
        cameras: [],
        camerasIsLoading: false,
        camerasIsNotFound: false,
        selectCameraId: ''
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
      }
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-item')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
