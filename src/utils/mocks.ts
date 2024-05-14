import { datatype } from 'faker';
import { CameraItem, CameraItems } from "../types/camera-item";

export const makeFakeCamera = (): CameraItem => ({
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

export const makeFakeCameras = (): CameraItems => Array.from({ length: 4 }, makeFakeCamera);
