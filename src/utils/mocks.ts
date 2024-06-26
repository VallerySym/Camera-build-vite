import { datatype } from 'faker';
import { CameraItem, CameraItems } from '../types/camera-item';
import { Review, Reviews } from '../types/review';
import { Promo } from '../types/promo';
import { PostData, State } from '../types/state';
import { RequestStatus } from '../const';
import { Action } from 'redux';

const makeFakeCamera = (): CameraItem => ({
  id: datatype.number(),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: datatype.string(),
  level: datatype.string(),
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
    selectCameraId: ''
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
    postData:{
      tel: '',
      id:'',
    },
    isPopupOpen: false,
    isPopupCallMeOpen: false,
    popupCallIsLoading: false,
    popupCallIsNotFound: false,
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
  ...initialState ?? {},
});

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const makeFakeSimilarCameras = (): CameraItem[] => Array.from({length: 10}, makeFakeCamera);

const makeFakePostData = (): PostData => ({
  tel: datatype.string(),
  id: datatype.string(),

});

export {
  makeFakeCamera, makeFakeCameras, makeFakeReview,
  makeFakeReviews, makeFakePromoList, makeFakeStore,
  extractActionsTypes,makeFakeSimilarCameras, makeFakePostData
};
