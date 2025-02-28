<template>
  <div class="bg-white shadow-xl rounded-lg p-6 text-center transition-all duration-300 hover:scale-105"  :class="$darkClass">
    <img :src="testimonial.image" class="w-16 h-16 rounded-full mx-auto mb-4" alt="Customer" />
    <h3 class="text-lg font-semibold text-primary">{{ testimonial.name }}</h3>
    <p class="text-gray-600 mt-2 dark:text-gray-300">{{ testimonial.review }}</p>
    <div class="flex justify-center my-3">
      <span v-for="star in 5" :key="star">
        <svg
            v-if="star <= testimonial.rating"
            class="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
        </svg>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  image: string;
}

defineProps<{ testimonial: Testimonial }>();
</script>
