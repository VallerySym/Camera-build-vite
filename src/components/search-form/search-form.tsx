import { useRef, useState, useEffect, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppRoute, MIN_SEARCH_CHAR } from '../../const';
import { getCameras } from '../../store/catalog-process/catalog-process.selectors';
import { CameraItems } from '../../types/camera-item';

function SearchForm() {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const resultsListRef = useRef<Array<HTMLLIElement | null>>([]);

  const cameras = useAppSelector(getCameras);

  const [results, setResults] = useState<CameraItems>([]);
  const [searchText, setSearchText] = useState('');
  const [focusedCameraId, setFocusedCameraId] = useState(-1);

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value);

    const searchResults = cameras.filter((camera) => camera.name.toLowerCase().includes(evt.currentTarget.value.toLocaleLowerCase()));

    setResults(searchResults);
  };

  const handleResetButtonClick = () => {
    setSearchText('');
    setResults([]);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setFocusedCameraId((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (focusedCameraId === 0) {
        if (searchRef.current) {
          searchRef.current.focus();
        }
        setFocusedCameraId(-1);
      } else {
        setFocusedCameraId((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    } else if (evt.key === 'Enter' && focusedCameraId !== -1) {
      const focusedCamera = results[focusedCameraId];
      navigate(`${AppRoute.Camera}/${focusedCamera.id}`);
    }
  };

  const handleCameraClick = (evt: MouseEvent<HTMLLIElement>) => {
    navigate(`${AppRoute.Camera}/${evt.currentTarget.value}`);
  };

  useEffect(() => {
    if (focusedCameraId !== -1 && resultsListRef.current[focusedCameraId]) {
      const focusedCamera = resultsListRef.current[focusedCameraId];
      if (focusedCamera) {
        focusedCamera.focus();
      }
    }
  }, [focusedCameraId]);

  return (
    <div className={cn('form-search',{ 'list-opened': searchText.length })}>
      <FocusLock ref={focusRef} returnFocus disabled={!results.length || !searchText}>
        <form onKeyDown={handleKeyDown} data-testid='search-form'>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              ref={searchRef}
              onChange={handleSearchInput}
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
            />
          </label>
          {results.length !== 0 && searchText.length >= MIN_SEARCH_CHAR &&
            <ul className="form-search__select-list scroller">
              {results.map((result, id) => (
                <li
                  className="form-search__select-item"
                  key={result.id}
                  value={result.id}
                  onClick={handleCameraClick}
                  onFocus={() => setFocusedCameraId(id)}
                  ref={(focucedProduct) => (resultsListRef.current[id] = focucedProduct)}
                  tabIndex={0}
                >
                  {result.name}
                </li>))}
            </ul>}
        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetButtonClick}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </FocusLock>
    </div>
  );
}

export default SearchForm;
