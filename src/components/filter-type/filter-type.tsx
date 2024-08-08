import { CameraCategory, CameraType, CameraTypeEng } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasCategory, getCamerasType } from '../../store/catalog-process/catalog-process.selectors';
import { setCamerasType } from '../../store/catalog-process/catalog-process.slice';
import { CameraItemType } from '../../types/camera-item';

function FilterType(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(getCamerasType);
  const isActiveCategoryVideo = useAppSelector(getCamerasCategory) === CameraCategory.VideoCamera;

  const handleTypeInputClick = (type: CameraItemType) => {
    dispatch(setCamerasType(type));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-type">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(CameraType).map((type) => {
        const isTypeDisabled = isActiveCategoryVideo && (type === CameraType.Snapshot || type === CameraType.Film);

        return (
          <div className="custom-checkbox catalog-filter__item" key={CameraTypeEng[type]}>
            <label>
              <input
                type="checkbox"
                name={type.toLowerCase()}
                checked={currentType.includes(type)}
                onChange={() => handleTypeInputClick(type)}
                disabled={isTypeDisabled}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{type}</span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default FilterType;
