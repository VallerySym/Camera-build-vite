import { store } from '../store/index';
import { CameraItems, CameraItem} from './camera-item';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ErrorMessageProcess = {
  errorMessage: string | null;
};

export type CamerasProcess = {
  cameras: CameraItems;
  camerasIsLoading: boolean;
  camerasIsNotFound: boolean;
};

export type CameraProcess = {
  camera: CameraItem | null;
  cameraIsLoading: boolean;
  cameraIsNotFound: boolean;
};
