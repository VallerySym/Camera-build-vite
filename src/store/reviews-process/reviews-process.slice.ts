import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsProcess } from '../../types/state';
import { fetchReviewsAction } from '../api-actions';
import { RequestStatus } from '../../const';

const initialState: ReviewsProcess = {
  reviews: [],
  reviewsIsLoading: false,
  reviewsIsNotFound: false,
  reviewRequestStatus: RequestStatus.Idle,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviewRequestStatusByDefault: (state) => {
      state.reviewRequestStatus = RequestStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsIsLoading = true;
        state.reviewsIsNotFound = false;
      })

      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const reviewsData = action.payload;

        if (reviewsData.length > 0) {
          state.reviews = reviewsData;
        }

        state.reviewsIsLoading = false;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsIsLoading = false;
        state.reviewsIsNotFound = true;
      });
  },
});

export const {setReviewRequestStatusByDefault} = reviewsSlice.actions;
