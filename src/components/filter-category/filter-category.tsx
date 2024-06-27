import { CameraCategory } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasCategory } from '../../store/catalog-process/catalog-process.selectors';
import { setCamerasCategory } from '../../store/catalog-process/catalog-process.slice';
import { CameraItemCategory } from '../../types/camera-item';

function FilterCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCamerasCategory);

  const handleCategoryInputClick = (category: CameraItemCategory) => {
    dispatch(setCamerasCategory(category));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-category">
      <legend className="title title--h5">Категория</legend>
      {Object.entries(CameraCategory).map(([category, value]) => (
        <div className="custom-radio catalog-filter__item" key={category}>
          <label>
            <input
              type="radio"
              name={category.toLowerCase()}
              checked={currentCategory === value}
              onChange={() => handleCategoryInputClick(value)}
            />
            <span className="custom-radio__icon"></span>
            <span className="custom-radio__label">{value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterCategory;
