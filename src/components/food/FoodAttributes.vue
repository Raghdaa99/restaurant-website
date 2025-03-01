<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
    <div class="flex items-center gap-3">
      <i class="fas fa-clock text-primary text-sm md:text-base"></i>
      <div>
        <div class="text-xs md:text-sm text-gray-500">{{ $t('foodDetails.prepTime') }}</div>
        <div class="text-sm md:text-base font-medium">{{ prepTime }}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <i class="fas fa-fire text-primary text-sm md:text-base"></i>
      <div>
        <div class="text-xs md:text-sm text-gray-500">{{ $t('foodDetails.calories') }}</div>
        <div class="text-sm md:text-base font-medium">{{ calories }}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <i class="fas fa-utensils text-primary text-sm md:text-base"></i>
      <div>
        <div class="text-xs md:text-sm text-gray-500">{{ $t('foodDetails.category') }}</div>
        <div class="text-sm md:text-base font-medium">{{ category }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  prepTime: string;
  calories: string;
  category: string;
}>();
</script> 