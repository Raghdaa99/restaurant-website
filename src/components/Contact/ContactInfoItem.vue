<template>
  <div class="flex items-start space-x-4 mt-4">
    <!-- Icon Section -->
    <div class="flex items-center justify-center bg-gray-200 text-gray-600 rounded-md w-12 h-12">
      <i :class="'fas fa-' + icon + ' text-xl'"></i>
    </div>

    <!-- Content Section -->
    <div>
      <h4 class="text-gray-800 text-lg sm:text-xl font-semibold  dark:text-gray-300">{{ title }}</h4>
      <p class="text-gray-600 text-sm sm:text-base leading-relaxed  dark:text-gray-300">{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
  content: String
});
</script>

