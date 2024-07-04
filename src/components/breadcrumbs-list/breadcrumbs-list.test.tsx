import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BreadcrumbsList from './breadcrumbs-list';
import { makeFakeCameras, makeFakeCamera } from '../../utils/mocks';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE } from '../../const';

describe('Component: BreadcrumbsList', () => {
  const mockCamerasList = makeFakeCameras();
  const mockCameraItem = makeFakeCamera();

  it('should render correctly', () => {
    const expectedTest = 'breadcrumbs-list';
    const expectedLinkText = 'Главная';
    const { withStoreComponent } = withStore(<BreadcrumbsList />, {
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
      },
      CAMERA: {
        camera: { ...mockCameraItem },
        cameraIsLoading: false,
        cameraIsNotFound: false,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});

