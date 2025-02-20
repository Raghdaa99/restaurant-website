<template>
   <div class="z-0">
        <Header />
      </div>
  <MenuSection/>
  <ServicesSection/>
  <TestimonialsSection/>
  <CallToActionSection/>
</template>

<script setup lang="ts">
import TestimonialsSection from "@/components/Home/TestimonialsSection.vue";
import CallToActionSection from "@/components/Home/CallToActionSection.vue";
import ServicesSection from "@/components/Home/ServicesSection.vue";
import MenuSection from "@/components/Home/MenuSection.vue";
import Header from "@/components/layouts/Header.vue"
</script>
