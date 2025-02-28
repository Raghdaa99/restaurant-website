<template>
 <div class="min-h-screen bg-gradient-to-b from-white to-gray-50 font-salsa text-black" :class="$darkClass">
  <div class="z-0">
    <HomeHeader />
  </div>
  <FoodCategoriesSection />
  <MenuSection />
  <ServicesSection />
  <CallToActionSection />
  <TestimonialsSection />
  <div class="container mx-auto px-4 md:px-32 lg:px-32 py-12 mt-15 dark:bg-slate-900 ">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 dark:text-white">
      Find a Location
    </h2>
    <div class="rounded-lg shadow-lg overflow-hidden">
      <LocationMap/>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import TestimonialsSection from "@/components/home/TestimonialsSection.vue";
import CallToActionSection from "@/components/home/CallToActionSection.vue";
import ServicesSection from "@/components/home/ServicesSection.vue";
import MenuSection from "@/components/home/MenuSection.vue";
import FoodCategoriesSection from "@/components/home/FoodCategoriesSection.vue";
import HomeHeader from "@/components/layouts/HomeHeader.vue";
import LocationMap from "@/components/contact/LocationMap.vue";
</script>
