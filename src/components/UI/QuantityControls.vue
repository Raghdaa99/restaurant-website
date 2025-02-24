<template>
  <div class="flex items-center">
    <button 
      v-if="quantity > 1"
      @click="$emit('decrease')"
      class="quantity-btn rounded-l-lg"
    >
      -
    </button>
    <button 
      v-else 
      @click="$emit('remove')"
      class="quantity-btn rounded-l-lg"
    >
      <i class="fas fa-trash"></i>
    </button>
    <span class="w-8 sm:w-12 text-center bg-primary text-white py-1 sm:py-2">
      {{ quantity }}
    </span>
    <button
      @click="$emit('increase')"
      class="quantity-btn rounded-r-lg"
    >
      +
    </button> 
  </div>
</template>

<script setup lang="ts">
defineProps<{
  quantity: number;
}>();

defineEmits<{
  (e: 'increase'): void;
  (e: 'decrease'): void;
  (e: 'remove'): void;
}>();
</script>

<style scoped>
.quantity-btn {
  @apply px-2 sm:px-3 py-1 sm:py-2 bg-primary text-white transition-colors hover:bg-primary/80;
}
</style> 