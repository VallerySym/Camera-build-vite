export enum AppRoute {
    Catalog = '/',
    Product ='/camera/:id',
    NotFound = '*',
  }

export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
    Cameras = 'CAMERAS',
    Camera ='CAMERA',
    Error = 'ERROR'
  }

export enum APIRoute {
    Cameras = '/cameras',
    Product ='/camera'
  }

export enum Tab {
    Characteristics = 'characteristics',
    Description = 'description'
  }
