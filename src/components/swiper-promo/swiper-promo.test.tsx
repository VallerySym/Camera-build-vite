import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen} from '@testing-library/react';
import SwiperPromo from './swiper-promo';
import { makeFakePromoList } from '../../utils/mocks';

describe('Component: Swiper Promo', () => {
  const mockPromoList = makeFakePromoList();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SwiperPromo />, {
        PROMO: {
          promoCameras: [...mockPromoList],
          promoCamerasIsNotFound: false,
          promoCamerasIsLoading: true,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('swiper').length).toBe(mockPromoList.length);
  });
});
