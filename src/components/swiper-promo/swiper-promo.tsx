import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useAppSelector } from '../../hooks';
import { getPromoCameras } from '../../store/promo-process/promo-process.selectors';
import Banner from '../banner/banner';
import './swiper-promo.css';

function SwiperPromo(): JSX.Element {

  const promoList = useAppSelector(getPromoCameras);

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {promoList.length > 0 && promoList.map((promoCamera) => (
        <SwiperSlide key={promoCamera.id} data-testid='swiper'>
          <Banner promoCamera={promoCamera} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperPromo;
