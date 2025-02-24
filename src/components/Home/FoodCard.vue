<template>
  <div class="food-item-card" @click.stop="navigateToFoodDetails(food.id)">
    <img
      :src="food.image"
      :alt="food.name"
      class="w-full h-40 object-cover rounded-xl shadow-lg"
    />
    <div class="flex flex-col p-4 h-full">
      <div class="text-start">
        <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-800">{{ food.name }}</h3>
      </div>
        <p class="text-sm text-gray-500 mt-1">
          {{ `${food.description.slice(0, 100)}...` }}
        </p>
      </div>

      <div class="flex items-center justify-between mt-2">
        <span class="text-xl font-semibold text-primary">${{ food.price }}</span>

        <!-- Cart Controls -->
        <div @click.stop>
          <template v-if="!isItemInCart(food.id)">
            <AddToCartButton :item="cartItem" />
          </template>
          <template v-else>
            <QuantityControls
              :quantity="getQuantity(food.id)"
              @increase="handleIncreaseQuantity(food.id)"
              @decrease="handleDecreaseQuantity(food.id)"
              @remove="handleRemoveItem(food.id)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";
import type { Food } from "@/types/food";
import AddToCartButton from "@/components/Cart/AddToCartButton.vue";
import QuantityControls from "@/components/UI/QuantityControls.vue";


const props = defineProps<{
  food: Food;
}>();

const router = useRouter();
const {
  isItemInCart,
  getQuantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
} = useCart();

const cartItem = computed(() => ({
  id: props.food.id,
  name: props.food.name,
  price: props.food.price,
  image: props.food.image,
}));

const navigateToFoodDetails = (id: number) => {
  router.push(`/food/${id}`);
};
</script>

<style scoped>
.food-item-card {
  @apply rounded-lg shadow-lg border border-gray-200
         transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl;
}
</style>
