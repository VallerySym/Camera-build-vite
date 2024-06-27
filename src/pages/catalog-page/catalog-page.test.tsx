import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import CatalogPage from './catalog-page';
import { makeFakeCameras, makeFakePromoList, makeFakeCamera } from '../../utils/mocks';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE } from '../../const';

describe('Component: CatalogPage', () => {
  const mockCameraList = makeFakeCameras();
  const mockPromoList = makeFakePromoList();
  const mockCameraItem = makeFakeCamera();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogPage />, {
      CAMERAS: {
        cameras: [...mockCameraList],
        camerasIsLoading: true,
        camerasIsNotFound: false,
        selectCameraId: '',
        sortType: DEFAULT_SORT_TYPE,
        sortOrder: DEFAULT_SORT_ORDER,
        category: null,
        type: [],
        level: [],
        isResetFilters: false,
      },
      CAMERA: {
        camera: { ...mockCameraItem },
        cameraIsLoading: false,
        cameraIsNotFound: false,
      },
      PROMO: {
        promoCameras: [...mockPromoList],
        promoCamerasIsLoading: true,
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
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const expectedText = 'Каталог фото- и видеотехники';

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
