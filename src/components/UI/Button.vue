<template>
  <button
    class="button px-2 py-2 w text-white text-sm rounded-lg bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary transition-all"
    type="submit"
     >     
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-lg px-2"></i>
    </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
}>();
</script> 