import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import SearchForm from './search-form';
import { DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE } from '../../const';

describe('Component: Search Form', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SearchForm />, {
      CAMERAS: {
        cameras: [],
        camerasIsLoading: false,
        camerasIsNotFound: false,
        selectCameraId: '',
        sortType: DEFAULT_SORT_TYPE,
        sortOrder: DEFAULT_SORT_ORDER,
        category: null,
        isReset: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
