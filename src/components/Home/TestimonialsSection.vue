<template>
  <div class="py-16 bg-gray-100 px-4" :class="darkClass">
    <h2 class="text-3xl font-bold text-center text-primary mb-10">{{ $t("testimonials") }}</h2>
    <div class="relative max-w-4xl mx-auto">
      <!-- Swiper Carousel -->
      <swiper
          :modules="[Autoplay, Pagination]"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="w-full"
      >
        <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
          <TestimonialCard :testimonial="testimonial" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard.vue";

// Import images
import user1Image from "@/assets/images/customers/user1.jpg";
import user2Image from "@/assets/images/customers/user2.jpg";
import user3Image from "@/assets/images/customers/user3.jpg";
import { darkClass } from "@/utils/theme";

const testimonials = ref([
  {
    name: "John Doe",
    review: "Amazing food and great service!",
    rating: 5,
    image: user1Image,  
  },
  {
    name: "Michael Lee",
    review: "Absolutely loved it! Highly recommend.",
    rating: 4.5,
    image: user2Image,
  },
  {
    name: "Sarah Smith",
    review: "Fast delivery and fresh ingredients!",
    rating: 5,
    image: user3Image,
  },
]);
</script>

<style scoped>
:deep(.swiper-pagination-bullet-active) {
  background-color: #ff6600 !important;
}
</style>
