export const TIMEOUT_SHOW_ERROR = 2000;
export const TIME_TO_RENDER_PAGE = 1000;

export const MIN_SEARCH_CHAR = 3;

export const PER_PAGE_CAMERAS_COUNT = 9;
export const MAX_PAGE_COUNT = 3;
export const MAX_PAGINATION_ITEM_SHOW = 3;

export const MAX_QUANTITY_BASKET_ITEMS = 9;
export const MIN_QUANTITY_BASKET_ITEMS = 1;

export const MIN_VALUE_RATING = 1;
export const MAX_VALUE_RATING = 5;

export enum ReviewNameLength {
  Min = 2,
  Max = 15
}

export enum ReviewTextLength {
  Min = 10,
  Max = 160
}

export enum AppRoute {
  Catalog = '/',
  Product = '/camera/:id',
  Camera = '/camera',
  Basket = '/basket',
  NotFound = '*',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Reviews = 'REVIEWS',
  Popup = 'POPUP',
  Error = 'ERROR',
  Promo = 'PROMO',
  Similar = 'SIMILAR',
  Basket = 'BASKET'
}

export enum APIRoute {
  Cameras = '/cameras',
  Product = '/camera',
  Reviews = '/reviews',
  Promo = '/promo',
  Basket = '/card',
  Order='/orders',
  Coupon = '/coupons',
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
  Loading = 'loading',
}

export const stars = [1, 2, 3, 4, 5];

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

export const CameraCategory = {
  PhotoCamera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
} as const;

export const CameraType = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Collection: 'Коллекционная',
} as const;

export const CameraTypeEng = {
  [CameraType.Collection]: 'collection',
  [CameraType.Snapshot]: 'snapshot',
  [CameraType.Film]: 'film',
  [CameraType.Digital]: 'digital',
} as const;

export const CameraLevel = {
  Zero: 'Нулевой',
  'Non-professional': 'Любительский',
  Professional: 'Профессиональный',
} as const;

export enum CouponType {
  'camera-333' = 'camera-333',
  'camera-444' = 'camera-444',
  'camera-555' = 'camera-555',
}

export const DiscountPercent = {
  ZeroPercent: 0,
  OnePercent: 1,
  TwoPercents: 2,
  ThreePercents: 3,
  FivePercents: 5,
  TenPercents: 10,
  FifteenPercents: 15,
} as const;

export const ProductQntDiscountRange = {
  OneProduct: 1,
  TwoProducts: 2,
  ThreeProducts: 3,
  FiveProducts: 5,
  SixProducts: 6,
  TenProducts: 10
} as const;

export const OrderSummRange = {
  TenThousand: 10000,
  TwentyThousand: 20000,
  ThirtyThousand: 30000
} as const;
