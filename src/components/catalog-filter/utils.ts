import { SortOrder, SortType } from '../../const';
import { CameraItem, CameraItemCategory, CameraItemLevel, CameraItemType, CameraItems } from '../../types/camera-item';

const sortCamerasByPriceDown = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraB.price - cameraA.price;

const sortCamerasByPriceUp = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraA.price - cameraB.price;

const sortCamerasByPrice = {
  [SortOrder.Up]: (cameras: CameraItems) => [...cameras].sort(sortCamerasByPriceUp),
  [SortOrder.Down]: (cameras: CameraItems) => [...cameras].sort(sortCamerasByPriceDown),
};

const sortCamerasByPopularityDown = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraB.rating - cameraA.rating;

const sortCamerasByPopularityUp = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraA.rating - cameraB.rating;

const sortCamerasByPopularity = {
  [SortOrder.Up]: (cameras: CameraItems) => [...cameras].sort(sortCamerasByPopularityUp),
  [SortOrder.Down]: (cameras: CameraItems) => [...cameras].sort(sortCamerasByPopularityDown),
};

export const sortCameras = (
  cameras: CameraItems,
  activeSortType: SortType | null,
  activeSortOrder: SortOrder | null
) => {
  let sortedCameras: CameraItems = cameras;

  if (activeSortType && activeSortOrder) {
    if (activeSortType === SortType.Popular) {
      sortedCameras = sortCamerasByPopularity[activeSortOrder](cameras);
    } else if (activeSortType === SortType.Price) {
      sortedCameras = sortCamerasByPrice[activeSortOrder](cameras);
    }
  }

  return sortedCameras;
};

export const filterCamerasByCategory = (cameras: CameraItem[], category: CameraItemCategory | null) => {
  if (!category) {
    return cameras;
  }

  const filteredCameras = [...cameras].filter((camera) => camera.category === category);
  return filteredCameras;
};

export const filterCamerasByType = (cameras: CameraItem[], type: CameraItemType[]) => {
  if (!type?.length) {
    return cameras;
  }
  const filteredCamerasList = [...cameras].filter((camera) => type.includes(camera.type));
  return filteredCamerasList;
};

export const filterCamerasByLevel = (cameras: CameraItem[], level: CameraItemLevel[]) => {
  if (!level?.length) {
    return cameras;
  }
  const filteredCamerasList = [...cameras].filter((camera) => level.includes(camera.level));
  return filteredCamerasList;
};

export const getMinPrice = (camerasList: CameraItem[]) => {
  if (!camerasList.length) {
    return 0;
  }
  const filtredCamerasList = [...camerasList].sort((a, b) => a.price - b.price);
  return filtredCamerasList[0].price;
};

export const getMaxPrice = (camerasList: CameraItem[]) => {
  if (!camerasList.length) {
    return 0;
  }
  const filtredCamerasList = [...camerasList].sort((a, b) => b.price - a.price);
  return filtredCamerasList[0].price;
};

export const filterCamerasByPrice = (productList: CameraItem[], minPrice: number, maxPrice: number) => {
  if (!minPrice && !maxPrice) {
    return productList;
  }
  if (!maxPrice) {
    maxPrice = Infinity;
  }
  const filteredProductList = productList.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  return filteredProductList;
};


export const filterCameras = (
  camerasList: CameraItem[],
  category: CameraItemCategory | null,
  type: CameraItemType[],
  level: CameraItemLevel[],
  minPrice: number,
  maxPrice: number
) => {
  const filteredCamerasByCategory = filterCamerasByCategory(camerasList, category);
  const filteredCamerasListByType = filterCamerasByType(filteredCamerasByCategory, type);
  const filteredCamerasListByLevel = filterCamerasByLevel(filteredCamerasListByType, level);
  const filtredCamerasListByPrice = filterCamerasByPrice(filteredCamerasListByLevel, minPrice, maxPrice);
  return filtredCamerasListByPrice;
};
