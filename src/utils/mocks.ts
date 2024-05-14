import { datatype } from 'faker';
import { CameraItem, CameraItems } from "../types/camera-item";
import { Review, Reviews } from '../types/review';

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
    previewImgWebp:datatype.string(),
    previewImgWebp2x: datatype.string(),
});

 const makeFakeCameras = (): CameraItems => Array.from({ length: 4 }, makeFakeCamera);

 const makeFakeReview = (): Review => ({
    id:datatype.string(),
    cameraId: datatype.number(),
    userName: datatype.string(),
    advantage: datatype.string(),
    disadvantage: datatype.string(),
    review: datatype.string(),
    rating: datatype.number(),
    createAt: datatype.string(),
  });
  
  const makeFakeReviews = (): Reviews => Array.from({ length: 3 }, makeFakeReview);

  export {makeFakeCamera, makeFakeCameras, makeFakeReview, makeFakeReviews};