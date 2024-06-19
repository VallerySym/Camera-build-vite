import { CameraCategory } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasCategory } from '../../store/catalog-process/catalog-process.selectors';
import { setCamerasCategory } from '../../store/catalog-process/catalog-process.slice';

function FilterCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCamerasCategory);

  const handleCategoryInputClick = (type: CameraCategory) => {
    dispatch(setCamerasCategory(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-radio catalog-filter__item">
        <label>
          <input type="radio" name="photocamera"
            checked={currentCategory === CameraCategory.VideoCamera}
            onChange={() => handleCategoryInputClick(CameraCategory.VideoCamera)}
          />
          <span className="custom-radio__icon"></span>
          <span className="custom-radio__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-radio catalog-filter__item">
        <label>
          <input type="radio" name="videocamera"
            checked={currentCategory === CameraCategory.PhotoCamera}
            onChange={() => handleCategoryInputClick(CameraCategory.PhotoCamera)}
          />
          <span className="custom-radio__icon"></span>
          <span className="custom-radio__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}

export default FilterCategory;
