import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { PaginationItem } from '../pagination-item/pagination-item';
import { getCurrentPage } from '../../store/catalog-process/catalog-process.selectors';
import { setCurrentPage } from '../../store/catalog-process/catalog-process.slice';
import { MAX_PAGE_COUNT, MAX_PAGINATION_ITEM_SHOW } from '../../const';

type PaginationProps = {
  totalCountPage: number;
}

export function Pagination({ totalCountPage }: PaginationProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const pageAllNumbers = [...Array(totalCountPage).keys()];
  const perPageNumber = Math.ceil(currentPage / MAX_PAGE_COUNT);
  const lastPageIndex = perPageNumber * MAX_PAGE_COUNT;
  const firstPageIndex = lastPageIndex - MAX_PAGE_COUNT;
  const currentPageNumbers = pageAllNumbers.slice(firstPageIndex, lastPageIndex);
  const isHidenClassPrevPage = totalCountPage <= MAX_PAGINATION_ITEM_SHOW || currentPage <= MAX_PAGINATION_ITEM_SHOW;
  const isHidenClassNextPage = currentPage >= totalCountPage - 1 || totalCountPage <= MAX_PAGINATION_ITEM_SHOW;

  const hanldeNextPageClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPageClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        <li
          className="pagination__item"
          style={{ visibility: `${isHidenClassPrevPage ? 'hidden' : 'visible'}` }}
        >
          <Link
            className="pagination__link pagination__link--text"
            to='#'
            onClick={handlePrevPageClick}
          >
            Назад
          </Link>
        </li>
        {currentPageNumbers.map((pageNumber) =>
          <PaginationItem key={pageNumber + 1} pageNumber={pageNumber + 1} />
        )}
        <li
          className="pagination__item"
          style={{ visibility: `${isHidenClassNextPage ? 'hidden' : 'visible'}` }}
        >
          <Link
            className="pagination__link pagination__link--text"
            to='#'
            onClick={hanldeNextPageClick}
          >
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}


export default Pagination;
