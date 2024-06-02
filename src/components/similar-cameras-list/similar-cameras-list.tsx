import { CameraItems } from '../../types/camera-item';
import SimilarCamera from '../similar-camera/similar-camera';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import './similar-cameras-list.css';

type SimilarCamerasListProps = {
  similarList: CameraItems;
}

function SimilarCamerasList({ similarList }: SimilarCamerasListProps): JSX.Element {
  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
            >
              {similarList.map((camera) => (
                <SwiperSlide key={camera.vendorCode}>
                  <SimilarCamera similarCamera={camera} style={{ width: '100%', margin: 0 }} />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            style={{pointerEvents: 'auto'}}
            disabled
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            style={{pointerEvents: 'auto'}}
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>

  );
}

export default SimilarCamerasList;
