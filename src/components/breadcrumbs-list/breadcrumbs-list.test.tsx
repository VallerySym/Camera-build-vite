import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BreadcrumbsList from './breadcrumbs-list';
import { makeFakeCameras, makeFakeCamera } from '../../utils/mocks';

describe('Component: Breadcrumbs', () => {
  const mockCameraList = makeFakeCameras();
  const mockCameraItem = makeFakeCamera();

  it('should render correctly', () => {
    const expectedTest = 'breadcrumbs';
    const expectedLinkText = 'Главная';
    const { withStoreComponent } = withStore(<BreadcrumbsList />, {
      CAMERAS: {
        cameras: [...mockCameraList],
        camerasIsLoading: true,
        camerasIsNotFound: false,
        selectCameraId: ''
      },
      CAMERA: {
        camera: {...mockCameraItem},
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
