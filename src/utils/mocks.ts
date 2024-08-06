import { datatype, } from 'faker';
import { faker } from '@faker-js/faker';
import { CameraItem, CameraItems } from '../types/camera-item';
import { Review, Reviews } from '../types/review';
import { Promo } from '../types/promo';
import { State } from '../types/state';
import { CameraCategory, CameraLevel, CameraType, DEFAULT_SORT_ORDER, DEFAULT_SORT_TYPE, RequestStatus } from '../const';
import { Action } from 'redux';

const makeFakeCamera = (): CameraItem => ({
  id: datatype.number(),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: faker.helpers.objectValue(CameraType),
  category: faker.helpers.objectValue(CameraCategory),
  description: datatype.string(),
  level: faker.helpers.objectValue(CameraLevel),
  price: datatype.number(),
  rating: datatype.number(),
  reviewCount: datatype.number(),
  previewImg: datatype.string(),
  previewImg2x: datatype.string(),
  previewImgWebp: datatype.string(),
  previewImgWebp2x: datatype.string(),
});

const makeFakeCameras = (): CameraItems => Array.from({ length: 4 }, makeFakeCamera);

const makeFakeReview = (): Review => ({
  id: datatype.string(),
  cameraId: datatype.number(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number(),
  createAt: datatype.string(),
});

const makeFakeReviews = (): Reviews => Array.from({ length: 3 }, makeFakeReview);

const makeFakePromoList = (): Promo[] => (
  new Array(3).fill(null).map(() => ({
    id: datatype.number({ min: 1, max: 50000000 }),
    name: datatype.string(),
    previewImg: datatype.string(),
    previewImg2x: datatype.string(),
    previewImgWebp: datatype.string(),
    previewImgWebp2x: datatype.string(),
  }))
);

const makeFakeStore = (initialState?: Partial<State>): State => ({
  CAMERAS: {
    cameras: [],
    camerasIsLoading: false,
    camerasIsNotFound: false,
    selectCameraId: '',
    sortType: DEFAULT_SORT_TYPE,
    sortOrder: DEFAULT_SORT_ORDER,
    category: null,
    type: [],
    level: [],
    minPrice: 0,
    maxPrice: 0,
    isResetFilters: false,
    currentPage: 1,
  },
  CAMERA: {
    camera: null,
    cameraIsLoading: false,
    cameraIsNotFound: false,
  },
  REVIEWS: {
    reviews: [],
    reviewsIsLoading: false,
    reviewsIsNotFound: false,
    reviewRequestStatus: RequestStatus.Idle,
  },
  POPUP: {
    isAddItemPopupOpen:false,
    isSuccessPopupOpen:false,
    isDeleteItemPopupOpen:false,
    isOrderSuccessPopupOpen:false,
    isAddReviewPopupOpen:false,
    isAddReviewSuccessPopupOpen:false,
    errorAddReview: false,
  },
  SIMILAR: {
    similarCameras: [],
    similarCameraIsLoading: false,
    similarCameraIsNotFound: false,
  },
  PROMO: {
    promoCameras: [],
    promoCamerasIsLoading: false,
    promoCamerasIsNotFound: false,
  },
  BASKET: {
    items: [],
    discount: 0,
    promoCode: null,
    discountPercent: 0,
    hasError: false,
    isPromoCodeValid: false,
    basketStatus: RequestStatus.Idle,
  },
  ...initialState ?? {},
});

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const makeFakeSimilarCameras = (): CameraItem[] => Array.from({ length: 10 }, makeFakeCamera);


export {
  makeFakeCamera, makeFakeCameras, makeFakeReview,
  makeFakeReviews, makeFakePromoList, makeFakeStore,
  extractActionsTypes, makeFakeSimilarCameras,
};
