import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import FilterCategory from '../filter-category/filter-category';
import { resetFilters } from '../../store/catalog-process/catalog-process.slice';
import FilterType from '../filter-type/filter-type';
import FilterLevel from '../filter-level/filter-level';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isResetFilters, setIsResetFilters] = useState(false);

  const handleFilterReset = () => {
    setIsResetFilters(true);
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (isResetFilters) {
      setIsResetFilters(false);
    }
  }, [isResetFilters]);

  return (
    <div className="catalog-filter" data-testid="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>
        <FilterCategory />
        <FilterType />
        <FilterLevel />
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleFilterReset}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>

  );
}

export default CatalogFilter;
