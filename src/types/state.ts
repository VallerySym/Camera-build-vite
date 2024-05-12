import { RequestStatus } from '../const';
import { store } from '../store/index';
import { CameraItems, CameraItem} from './camera-item';
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
  tel: string;
  isPopupOpen: boolean;
  isPopupCallMeOpen:boolean;
  popupCallIsLoading: boolean;
  popupCallIsNotFound: boolean;
};

export type CallMeData = {
  tel: string;
}

export type PostData = {
  postData: CallMeData;
  id: number;
}
