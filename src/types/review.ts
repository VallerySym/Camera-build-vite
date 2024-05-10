export type Review = {
    id:string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
    createAt: string;
}

export type Reviews = Review[];
 