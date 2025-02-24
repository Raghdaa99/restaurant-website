<template>
  <button
    class="button px-3 py-3  text-white rounded-lg bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary transition-all"
    type="submit"
     >     
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-base sm:text-lg md:text-xl"></i>
    </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
}>();
</script> 