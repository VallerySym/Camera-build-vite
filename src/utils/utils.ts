import { SortOrder, SortType, Tab } from '../const';
import { CameraItem, CameraItemCategory, CameraItemLevel, CameraItemType, CameraItems } from '../types/camera-item';

export const getTabName = (tab: Tab) => {
  switch (tab) {
    case Tab.Characteristics:
      return 'Характеристики';
    case Tab.Description:
      return 'Описание';
  }
};

export const sortByType = (sortType: SortType) => {
  switch (sortType) {
    case SortType.Price:
      return 'по цене';
    case SortType.Popular:
      return 'по популярности';
  }
};

export const sortByOrder = (sortOrder: SortOrder) => {
  switch (sortOrder) {
    case SortOrder.Up:
      return 'По возростанию';
    case SortOrder.Down:
      return 'По убыванию';
  }
};

const sortCamerasByPriceDecrease = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraB.price - cameraA.price;

const sortCamerasByPriceIncrease = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraA.price - cameraB.price;

const sortCamerasByPrice = {
  [SortOrder.Up]: (cameras: CameraItems) =>[...cameras].sort(sortCamerasByPriceIncrease),
  [SortOrder.Down]: (cameras: CameraItems) =>[...cameras].sort(sortCamerasByPriceDecrease),
};

const sortCamerasByPopularityDecrease = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraB.rating - cameraA.rating;

const sortCamerasByPopularityIncrease = (cameraA: CameraItem, cameraB: CameraItem) =>
  cameraA.rating - cameraB.rating;

const sortCamerasByPopularity = {
  [SortOrder.Up]: (cameras: CameraItems) =>[...cameras].sort(sortCamerasByPopularityIncrease),
  [SortOrder.Down]: (cameras: CameraItems) =>[...cameras].sort(sortCamerasByPopularityDecrease),
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
  const filteredProductList = [...cameras].filter((product) => type.includes(product.type));
  return filteredProductList;
};

export const filterCamerasByLevel = (cameras: CameraItem[], level: CameraItemLevel[]) => {
  if (!level?.length) {
    return cameras;
  }
  const filteredProductList = [...cameras].filter((product) => level.includes(product.level));
  return filteredProductList;
};


export const filterCameras = (
  productList: CameraItem[],
  category: CameraItemCategory | null,
  type: CameraItemType[],
  level: CameraItemLevel[],
) => {
  const filteredProductListByCategory = filterCamerasByCategory(productList, category);
  const filteredProductListByType = filterCamerasByType(filteredProductListByCategory, type);
  const filteredProductListByLevel = filterCamerasByLevel(filteredProductListByType, level);

  return filteredProductListByLevel;
};
