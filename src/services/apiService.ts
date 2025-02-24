import axios from 'axios';
import type { Review } from '@/types/food';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchFoods = async () => {
  try {
    const response = await apiClient.get('/foods');
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addReview = async (review: Review) => {
  try {
    const response = await apiClient.post('/reviews', review);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const fetchReviews = async () => {
  try {
    const response = await apiClient.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
