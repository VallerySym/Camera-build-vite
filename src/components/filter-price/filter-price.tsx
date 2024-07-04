import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMaxPrice, getMinPrice } from '../catalog-filter/utils';
import { setMaxPrice, setMinPrice } from '../../store/catalog-process/catalog-process.slice';
import { getCameras, getCamerasMaxPrice, getCamerasMinPrice, getFilteredCameras, } from '../../store/catalog-process/catalog-process.selectors';

function FilterPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasList = useAppSelector(getCameras);
  const filteredCamerasList = useAppSelector(getFilteredCameras);
  const currentMinPrice = useAppSelector(getCamerasMinPrice);
  const currentMaxPrice = useAppSelector(getCamerasMaxPrice);

  const minPrice = getMinPrice(filteredCamerasList);
  const maxPrice = getMaxPrice(filteredCamerasList);

  const minPriceAll = getMinPrice(camerasList);
  const maxPriceAll = getMaxPrice(camerasList);

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  const checkMinPrice = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));
      return;
    }
    if (minPriceValue < minPrice) {
      setMinPriceValue(minPrice);
      dispatch(setMinPrice(minPrice));
      return;
    }
    if (minPriceValue > maxPrice) {
      setMinPriceValue(maxPrice);
      dispatch(setMinPrice(maxPrice));
      return;
    }
    dispatch(setMinPrice(minPriceValue));
  };

  const checkMaxPrice = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));
      return;
    }
    if (maxPriceValue > maxPrice) {
      setMaxPriceValue(maxPrice);
      dispatch(setMaxPrice(maxPrice));
      return;
    }
    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));
      return;
    }
    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMinPriceValue(minPriceAll);
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(price);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMaxPriceValue(maxPriceAll);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(price);
  };
  
  const handleInputMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      checkMinPrice();
    }
  };

  const handleInputMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      checkMaxPrice();
    }
  };

  return (
    <fieldset className="catalog-filter__block" data-testid='filter-price'>
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              min={Number.MIN_VALUE}
              onChange={handleMinPriceChange}
              onKeyDown={handleInputMinPriceKeyDown}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              min={Number.MIN_VALUE}
              onChange={handleMaxPriceChange}
              onKeyDown={handleInputMaxPriceKeyDown}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
