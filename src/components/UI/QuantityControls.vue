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
    <span class="w-8 px-2 py-1 text-center bg-primary text-white">
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
  @apply px-3 py-1 bg-primary text-white transition-colors hover:bg-primary/80;
}
</style> 