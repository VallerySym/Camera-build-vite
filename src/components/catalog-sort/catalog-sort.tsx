import cn from 'classnames';
import { SortType, SortOrder } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortByType, setSortByOrder } from '../../store/catalog-process/catalog-process.slice';
import { sortByType, sortByOrder } from './utils';
import { getSortOrder, getSortType } from '../../store/catalog-process/catalog-process.selectors';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSortType = useAppSelector(getSortType);
  const activeSortOrder = useAppSelector(getSortOrder);

  const handleSortTypeChange = (type: SortType) => {
    dispatch(setSortByType(type));
  };

  const handleSortOrderChange = (order: SortOrder) => {
    dispatch(setSortByOrder(order));
  };

  return (
    <div className="catalog-sort" data-testid="sorting">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.values(SortType).map((type) => (
              <div key={type} className="catalog-sort__btn-text">
                <input
                  tabIndex={0}
                  type="radio"
                  id={type}
                  name={`sort ${type}`}
                  checked={type === activeSortType}
                  onChange={() => handleSortTypeChange(type)}
                />
                <label htmlFor={type}>{sortByType(type)}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.values(SortOrder).map((order) => (
              <div
                key={order}
                className={cn('catalog-sort__btn', `catalog-sort__btn--${order}`)}
              >
                <input
                  tabIndex={0}
                  type="radio"
                  id={order}
                  name={`sort-icon ${order}`}
                  aria-label={sortByOrder(order)}
                  checked={order === activeSortOrder}
                  onChange={() => handleSortOrderChange(order)}
                />
                <label htmlFor={order}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
