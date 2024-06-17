import { RequestStatus, SortOrder, SortType } from '../const';
import { store } from '../store/index';
import { CameraItems, CameraItem} from './camera-item';
import { Promos } from './promo';
import { Reviews } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ErrorMessageProcess = {
  errorMessage: string | null;
};

export type CamerasProcess = {
  cameras: CameraItems;
  camerasIsLoading: boolean;
  camerasIsNotFound: boolean;
  selectCameraId: string;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
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
  postData: PostData;
  isPopupOpen: boolean;
  isPopupCallMeOpen:boolean;
  popupCallIsLoading: boolean;
  popupCallIsNotFound: boolean;
};

export type PostData = {
  tel: string;
  id: string ;
}

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
