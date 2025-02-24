<template>
  <router-link
    :to="to"
    class="button"
  >
  <button
      type="submit"
      class="px-3 py-3  text-white rounded-lg ">
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-base sm:text-lg md:text-xl"></i>
  </button>
    </router-link>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script> 