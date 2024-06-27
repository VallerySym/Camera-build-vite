import { CameraCategory, CameraLevel, CameraType } from '../const';

export type CameraItem = {
    id: number;
    name: string;
    vendorCode: string;
    type: CameraItemType;
    category: CameraItemCategory;
    description: string;
    level: CameraItemLevel;
    price: number;
    rating: number;
    reviewCount: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}

export type CameraItems = CameraItem[];

export type CameraItemType = typeof CameraType[keyof typeof CameraType];

export type CameraItemCategory = typeof CameraCategory[keyof typeof CameraCategory];

export type CameraItemLevel = typeof CameraLevel[keyof typeof CameraLevel];
