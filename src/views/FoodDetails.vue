<template>
  <div v-if="food" class="container mx-auto px-4 md:px-12 lg:px-32 py-12 mt-24">
    <!-- Food Details Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Food Image -->
      <div class="relative">
        <img 
          :src="food.image" 
          :alt="food.name"
          class="w-full h-[300px] md:h-[450px] object-cover rounded-xl shadow-lg"
        />
      </div>

      <!-- Food Details -->
      <div class="space-y-4 md:space-y-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ food.name }}</h1>
        
        <!-- Overall Rating -->
        <div class="flex items-center gap-2">
          <div class="flex">
            <i v-for="i in 5" 
              :key="i" 
              class="fas fa-star text-lg"
              :class="i <= averageRating ? 'text-yellow-400' : 'text-gray-300'"
            ></i> 
          </div>
          <span class="text-gray-600 text-sm flex items-center gap-2">
            <span class="font-medium">{{ averageRating || 0 }}/5</span>
            ({{ reviews?.length || 0 }} {{ reviews?.length === 1 ? 'Review' : 'Reviews' }})
          </span>
        </div>
        
        <!-- Description Card -->
        <FoodDetailsCard>
          <h2 class="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">Description</h2>
          <p class="text-sm md:text-base text-gray-600 leading-relaxed">{{ food.description }}</p>
          
          <FoodAttributes 
            :prep-time="food.prepTime"
            :calories="food.calories"
            :category="food.category"
          />
        </FoodDetailsCard>

        <!-- Price and Add to Cart -->
        <FoodDetailsCard>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="text-xs md:text-sm text-gray-500 mb-1">Price : 
                <span class="text-xl font-semibold text-primary">${{ food.price }}</span>
              </div>
              
            </div>
            <div class="flex flex-col items-end gap-2">
              <div @click.stop>
                <template v-if="!isItemInCart(food.id)">
                  <AddToCartButton :item="cartItem" title="Add to Cart" />
                </template>
                <template v-else>
                  <div class="relative group">
                    <QuantityControls
                      :quantity="getQuantity(food.id)"
                      @increase="handleIncreaseQuantity(food.id)"
                      @decrease="handleDecreaseQuantity(food.id)"
                      @remove="handleRemoveItem(food.id)"
                    />
                    <!-- Tooltip -->
                    <div class="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block 
                               bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      Click + to add more
                    </div>
                  </div>
                </template>
              </div>
              <!-- Helper Text -->
              <p v-if="isItemInCart(food.id)" class="text-xs text-gray-500 italic">
                <i class="fas fa-info-circle mr-1"></i>
                You can adjust quantity or remove item from cart
              </p>
            </div>
          </div>
        </FoodDetailsCard>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-12">
      <div v-if="reviews" class="bg-white shadow-lg rounded-xl px-8 md:p-8">
        <div class="flex items-center justify-start mb-6 gap-8">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800">Reviews</h2>
          <button 
            class="px-5 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 
                   transition-colors font-medium flex items-center gap-2"
            @click="isReviewModalOpen = true"
          >
            <i class="fas fa-plus mr-2"></i>
            Write a Review
          </button>
        </div>
        
        <div class="space-y-8">
          <ReviewCard 
            v-for="review in reviews" 
            :key="review.id" 
            :review="review" 
          />
        </div>
        
        <div v-if="reviews.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-lg">No reviews yet. Be the first to write a review!</p>
        </div>
      </div>
    </div>

    <!-- Related Foods -->
    <div class="mt-12">
      <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FoodCard 
          v-for="item in relatedFoods" 
          :key="item.id" 
          :food="item" 
        />
      </div>
    </div>

    <ReviewModal 
      :is-open="isReviewModalOpen"
      :foodId="food?.id || 0"
      @close="isReviewModalOpen = false"
      @submit="handleAddReview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from "@/composables/useCart";
import { fetchFoods } from '@/services/apiService';
import { useReviews } from '@/composables/useReviews';
import type { Food, Review } from '@/types/food';

// Components
import AddToCartButton from '@/components/Cart/AddToCartButton.vue';
import QuantityControls from '@/components/UI/QuantityControls.vue';
import FoodDetailsCard from '@/components/food/FoodDetailsCard.vue';
import FoodAttributes from '@/components/food/FoodAttributes.vue';
import ReviewCard from '@/components/food/ReviewCard.vue';
import FoodCard from '@/components/Home/FoodCard.vue';
import ReviewModal from '@/components/food/ReviewModal.vue';

const route = useRoute();
const food = ref<Food | null>(null);
const isReviewModalOpen = ref(false);
const foods = ref<Food[]>([]);

const { 
  isItemInCart, 
  getQuantity, 
  handleIncreaseQuantity, 
  handleDecreaseQuantity,
  handleRemoveItem 
} = useCart();

const id = Number(route.params.id);
const { reviews, averageRating, loadReviews, submitReview } = useReviews(id);

const cartItem = computed(() => food.value ? {
  id: food.value.id,
  name: food.value.name,
  price: food.value.price,
  image: food.value.image,
  quantity: 1
} : null);

const relatedFoods = computed(() => {
  if (!food.value) return [];
  return foods.value
    .filter(item => 
      item.category === food.value?.category && 
      item.id !== food.value?.id
    )
    .slice(0, 4);
});

const loadFoodDetails = async (id: number) => {
  try {
    foods.value = await fetchFoods();
    food.value = foods.value.find(item => Number(item.id) === id) || null;
    await loadReviews();
  } catch (error) {
    console.error('Error fetching food details:', error);
  }
};

onMounted(() => {
  loadFoodDetails(Number(route.params.id));
});

watch(() => route.params.id, (newId) => {
  loadFoodDetails(Number(newId));
});

const handleAddReview = async (review: Omit<Review, 'id'>) => {     
  try {
    await submitReview(review);
    isReviewModalOpen.value = false;
  } catch (error) {
    console.error('Error adding review:', error);
  }
};

</script>

<style scoped>
.group:hover .hidden {
  display: block;
}
</style>
