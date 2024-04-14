import { createStore } from "effector";
import { getReviewsFx } from "../api/review";
import { ReviewsResponse } from "../models/review";

const initialReviewState: ReviewsResponse = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 0,
};

const $reviewsStore = createStore<ReviewsResponse>(initialReviewState)
  .on(getReviewsFx.doneData, (_, response) => {
    return response;
  })
  .on(getReviewsFx.fail, (state, error) => {
    console.error("Failed to fetch reviews:", error);
    return state;
  });

export { $reviewsStore };
