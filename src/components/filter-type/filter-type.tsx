import { CameraType} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasType } from '../../store/catalog-process/catalog-process.selectors';
import { setCamerasType } from '../../store/catalog-process/catalog-process.slice';
import { CameraItemType } from '../../types/camera-item';

function FilterType(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(getCamerasType);

  const handleTypeInputClick = (type: CameraItemType) => {
    dispatch(setCamerasType(type));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-type">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.entries(CameraType).map(([type, value]) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input
              type="checkbox"
              name={type.toLowerCase()}
              checked={currentType.includes(value)}
              onChange={() => handleTypeInputClick(value)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterType;
