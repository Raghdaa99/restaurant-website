<template>
  <a
      href="#"
      class="flex items-center text-gray-600 border border-gray-600 rounded-md px-4 py-2 mt-2 space-x-2 hover:bg-gray-200 transition-all"
  >
    <i
        :class="'fab fa-' + icon"
        class="text-base sm:text-lg md:text-xl me-2"
    ></i>
    <span class="text-sm sm:text-base md:text-lg">{{ title }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
});
</script>

