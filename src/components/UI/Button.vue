<template>
  <router-link
    :to="to"
    class="button px-3 py-3  text-white rounded-lg"
     type="submit"
     >     
    <span>{{ title }}</span>
    <i v-if="icon" :class="'fas fa-' + icon" class="text-base sm:text-lg md:text-xl"></i>
    </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
  to: string;
}>();
</script> 