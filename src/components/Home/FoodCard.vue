<template>
  <div
      class="rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
    <img :src="image" alt="Food Item" class="w-full h-48 object-cover"/>
    <div class="flex flex-col p-4 h-full">
      <div class="text-start">  
        <h3 class="text-lg font-semibold text-gray-800">{{ name }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ description }}</p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <span class="text-xl font-semibold text-primary">${{ price }}</span>
        <Button title="" icon="shopping-cart" class="bg-primary hover:text-primary hover:bg-white  hover:border-2 hover:border-primary transition flex items-center "/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";

defineProps({
  name: String,
  description: String,
  price: String,
  image: String,
});
</script>
