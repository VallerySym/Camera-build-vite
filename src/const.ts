export enum AppRoute {
    Catalog = '/',
    Product ='/camera/:id',
    Camera ='/camera',
    NotFound = '*',
  }

export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
    Cameras = 'CAMERAS',
    Camera ='CAMERA',
    Reviews ='REVIEWS',
    Popup='POPUP',
    Error = 'ERROR',
    Promo= 'PROMO',
    Similar = 'SIMILAR'
  }

export enum APIRoute {
    Cameras = '/cameras',
    Product ='/camera',
    Reviews = '/reviews',
    Promo='/promo'
  }

export enum Tab {
    Characteristics = 'characteristics',
    Description = 'description'
  }

export enum RequestStatus {
    Idle = 'idle',
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
  }

export const stars = [1, 2, 3, 4, 5];

export const TIME_TO_RENDER_PAGE = 1000;

export enum SortType {
  Price = 'price',
  Popular = 'popular',
}

export enum SortOrder {
  Up = 'up',
  Down = 'down',
}

export const DEFAULT_SORT_TYPE = SortType.Price;

export const DEFAULT_SORT_ORDER = SortOrder.Up;

export const MIN_SEARCH_CHAR = 3;

export enum CameraCategory {
  PhotoCamera = 'Фотоаппарат',
  VideoCamera = 'Видеокамера',
}

export const CAMERA_CATEGORY = [
  { value: 'Фотоаппарат' },
  { value: 'Видеокамера' },
];
