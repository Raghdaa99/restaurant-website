<template>
  <div class="relative overflow-hidden">
    <BackgroundImages />
    <!-- Cards Section -->
    <div class="container mx-auto px-4 sm:px-2 md:px-12 lg:px-16 xl:px-36 py-12 text-center">
      <h2 class="text-3xl font-semibold mb-8">Our Menu</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FoodCard
            v-for="(item, index) in foodItems"
            :key="index"
            v-bind="item"
        />
      </div>
      <!-- View All Button -->
      <div class="mt-8 flex justify-center">
        <a href="/menu" class="text-lg font-medium text-primary flex items-center group">
          View All Menu
          <span class="ml-2 transition-transform group-hover:translate-x-2">➝</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundImages from "@/components/Home/BackgroundImages.vue";
import FoodCard from "@/components/Home/FoodCard.vue";
import { foodItems } from "@/data/foodData";
</script>
