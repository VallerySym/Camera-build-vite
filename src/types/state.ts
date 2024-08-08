import { CouponType, RequestStatus, SortOrder, SortType} from '../const';
import { store } from '../store/index';
import { Basket } from './basket';
import { CameraItems, CameraItem, CameraItemType, CameraItemCategory, CameraItemLevel} from './camera-item';
import { Promos } from './promo';
import { Reviews } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CamerasProcess = {
  cameras: CameraItems;
  camerasIsLoading: boolean;
  camerasIsNotFound: boolean;
  selectCameraId: string;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  category: CameraItemCategory | null;
  type: CameraItemType[];
  level: CameraItemLevel[];
  minPrice: number;
  maxPrice: number;
  isResetFilters: boolean;
  currentPage: number;
};

export type CameraProcess = {
  camera: CameraItem | null;
  cameraIsLoading: boolean;
  cameraIsNotFound: boolean;
};

export type ReviewsProcess = {
  reviews: Reviews;
  reviewsIsLoading: boolean;
  reviewsIsNotFound: boolean;
  reviewRequestStatus: RequestStatus;
};

export type PopupProcess = {
  isAddItemPopupOpen:boolean;
  isSuccessPopupOpen:boolean;
  isDeleteItemPopupOpen:boolean;
  isOrderSuccessPopupOpen:boolean;
  isAddReviewPopupOpen:boolean;
  isAddReviewSuccessPopupOpen:boolean;
  errorAddReview: boolean;
};

export type PromoProcess = {
  promoCameras: Promos;
  promoCamerasIsLoading: boolean;
  promoCamerasIsNotFound: boolean;
};

export type SimilarCamerasProcess = {
  similarCameras: CameraItems;
  similarCameraIsLoading: boolean;
  similarCameraIsNotFound: boolean;
};

export type BasketProcess = {
  items: Basket[] ;
  discount: number;
  promoCode: CouponType | null;
  discountPercent: number;
  hasError: boolean;
  isPromoCodeValid: boolean;
  basketStatus: RequestStatus;
};
