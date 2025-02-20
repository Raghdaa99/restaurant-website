<template>
  <button
      type="submit"
      class="px-8 py-3 bg-primary text-white rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary transition flex items-center space-x-2">
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-base sm:text-lg md:text-xl"></i>
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  icon: {
    type: String,
    default: ""
  },
});
</script>

