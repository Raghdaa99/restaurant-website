<template>
  <button
      type="submit"
      class="px-3 py-3  text-white rounded-lg ">
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

