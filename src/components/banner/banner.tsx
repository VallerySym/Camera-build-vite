import { Link } from 'react-router-dom';
import { Promo } from '../../types/promo';

type BannerProps = {
  promoCamera: Promo;
}

function Banner({promoCamera}:BannerProps): JSX.Element {

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`${promoCamera.previewImgWebp}, ${promoCamera.previewImgWebp2x}`}
        />
        <img
          src={promoCamera.previewImg}
          srcSet={`${promoCamera.previewImg2x}`}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {promoCamera.name}
        </span>
        <span className="banner__text">
                    Профессиональная камера от&nbsp;известного производителя
        </span>

        <Link
          className="btn"
          to={`/camera/${promoCamera.id}`}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
