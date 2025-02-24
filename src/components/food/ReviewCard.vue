<template>
  <div class="border-b pb-6 last:border-b-0">
    <!-- Review Header -->
    <div class="flex items-center justify-start gap-8 mb-2">
      <div class="flex items-center gap-2">
        <img 
          :src="review.userImage" 
          :alt="review.userName" 
          @error="handleImageError"
          class="w-10 h-10 rounded-full object-cover"
        >
        <div>
          <div class="font-semibold">{{ review.userName }}</div>
          <div class="text-gray-500 text-sm">{{ formatDate(review.date) }}</div>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <i v-for="i in 5" :key="i" 
          class="fas fa-star text-sm" 
          :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
        ></i>
      </div>
    </div>

    <!-- Review Content -->
    <p class="text-gray-600">{{ review.comment }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Review } from '@/data/foodData'

const props = defineProps<{
  review: Review
}>()

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(props.review.userName)
}
</script> 