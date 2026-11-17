import api from './api';

export interface Review {
  _id?: string;
  id?: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewPayload {
  productId: string;
  name: string;
  rating: number;
  comment: string;
}

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const response = await api.get<Review[]>(`/reviews/${productId}`);
  return response.data;
};

export const addReview = async (reviewData: CreateReviewPayload): Promise<Review> => {
  const response = await api.post<Review>('/reviews', reviewData);
  return response.data;
};

export const deleteReview = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/reviews/${id}`);
  return response.data;
};
