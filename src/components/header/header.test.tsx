import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE } from '../../const';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Header />, {
      CAMERAS: {
        cameras: [],
        camerasIsLoading: false,
        camerasIsNotFound: false,
        selectCameraId: '',
        sortType: DEFAULT_SORT_TYPE,
        sortOrder: DEFAULT_SORT_ORDER,
        category: null,
        type: [],
        level: [],
        isResetFilters: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
