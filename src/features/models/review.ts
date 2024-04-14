export interface Review {
  id: number;
  movieId: number;
  title: string | null;
  type: string | null;
  review: string | null;
  date: string | null;
  author: string | null;
  userRating: number | null;
  authorId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ReviewsResponse {
  docs: Review[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface MovieReviewsProps {
  movieId: number;
}
