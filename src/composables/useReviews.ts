import { ref } from 'vue';
import { fetchReviews, addReview } from '@/services/apiService';
import type { Review } from '@/types/food';

export function useReviews(foodId: number) {
  const reviews = ref<Review[]>([]);
  const averageRating = ref(0);

  const loadReviews = async () => {
    try {
      const allReviews = await fetchReviews();
      reviews.value = allReviews.filter((review: Review) => review.foodId === foodId)
      .sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime());
      calculateAverageRating();
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const calculateAverageRating = () => {
    if (!reviews.value.length) {
      averageRating.value = 0;
      return;
    }
    const total = reviews.value.reduce((sum: number, review: Review) => sum + review.rating, 0);
    averageRating.value = Math.round((total / reviews.value.length) * 10) / 10;
  };

  const submitReview = async (review: Review) => {
    try {
      const newReview = await addReview({ ...review, foodId });
      reviews.value.unshift(newReview);
      calculateAverageRating();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return {
    reviews,
    averageRating,
    loadReviews,
    submitReview,
  };
} 