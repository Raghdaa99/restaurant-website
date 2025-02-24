<template>
  <router-link
      :to="to"
      type="submit"
      class="px-4 py-2 bg-primary text-white rounded-md hover:text-primary hover:bg-white hover:border hover:border-primary transition flex items-center space-x-1 text-sm">
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-base sm:text-lg md:text-xl"></i>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  icon: {
    type: String,
    default: ""
  },
  to: {
    type: String,
    default: ""
  }
});
</script>

