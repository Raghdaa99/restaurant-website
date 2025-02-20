<template>
  <div class="flex flex-col items-center p-6">
    <component :is="icon" class="w-32 h-32 text-primary"/>
    <h3 class="font-semibold text-xl text-primary mt-4">{{ title }}</h3>
    <p class="text-lg text-gray-700 mt-4 text-center">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface ServiceProps {
  title: string;
  description: string;
  icon: any;
}
defineProps<ServiceProps>();
</script>
