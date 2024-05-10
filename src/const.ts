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
    Error = 'ERROR'
  }

export enum APIRoute {
    Cameras = '/cameras',
    Product ='/camera',
    Reviews = '/reviews',
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
