<template>
   <div class="z-0">
        <HomeHeader />
      </div>
  <MenuSection/>
  <ServicesSection/>
  <CallToActionSection/>
  <TestimonialsSection/>
</template>

<script setup lang="ts">
import TestimonialsSection from "@/components/home/TestimonialsSection.vue";
import CallToActionSection from "@/components/home/CallToActionSection.vue";
import ServicesSection from "@/components/home/ServicesSection.vue";
import MenuSection from "@/components/home/MenuSection.vue";
import HomeHeader from "@/components/layouts/HomeHeader.vue"
</script>
