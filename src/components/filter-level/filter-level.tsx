import { CameraLevel } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasLevel } from '../../store/catalog-process/catalog-process.selectors';
import { setCamerasLevel } from '../../store/catalog-process/catalog-process.slice';
import { CameraItemLevel } from '../../types/camera-item';

function FilterLevel(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(getCamerasLevel);

  const handleLevelInputClick = (level: CameraItemLevel) => {
    dispatch(setCamerasLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-level">
      <legend className="title title--h5">Уровень</legend>
      {Object.entries(CameraLevel).map(([level, value]) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input
              type="checkbox"
              name={level.toLowerCase()}
              checked={currentType.includes(value)}
              onChange={() => handleLevelInputClick(value)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterLevel;
