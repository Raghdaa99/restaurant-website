<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const images = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fusion6.com.au%2Fwp-content%2Fuploads%2F2021%2F04%2FIndian-Dishes-You-Need-to-Try.jpg&f=1&nofb=1&ipt=35cd6ede7c38793575eeb1c88b972bdc366b707ef4835cf902ac9bc57ea8ad82&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstudio3.com%2Fblog%2Fwp-content%2Fuploads%2F2015%2F05%2Fsteak-potato-restaurant-dinner-food-photography-studio-3.jpg&f=1&nofb=1&ipt=cf3bc96fa4f02e7785fbd5fc24d09e5df8016c6a7b151483c7c79f11ff2aeab6&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages6.alphacoders.com%2F100%2Fthumb-1920-1002209.jpg&f=1&nofb=1&ipt=da1f9d1b753d52b32ef7240d569d844499c8d6d9724ef6de57e7d8eab4a9f043&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3376127.jpg&f=1&nofb=1&ipt=5b2ec110c5f53dcacd802e2491b5e7f55fce297eb7975dc7b1ce80c521aecd21&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.foodiesfeed.com%2Fwp-content%2Fuploads%2F2023%2F06%2Fburger-with-melted-cheese.jpg&f=1&nofb=1&ipt=8c1ee9c8b06d5fefc915f48886efba1bd5ab596c66d689706633fcf776202b71&ipo=images",
];

const currentIndex = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  interval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  if (interval) clearInterval(interval);
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<template>
  <div
    id="indicators-carousel"
    class="relative w-full h-screen overflow-hidden"
    data-carousel="static"
  >
    <!-- Carousel wrapper -->
    <div class="z-10 absolute top-64 w-[50%] h-[50%]">
      <div
        class="flex flex-col rounded-l-none p-14 justify-center bg-gradient-to-r from-danger to-primary/90 rounded-se-full text-white w-full h-full"
      >
        <h1 class="text-4xl font-bold"> {{ $t("welcome_to_lazeez_restaurant") }} </h1>
        <p class="text-xl mt-4">
          {{ $t("welcome_to_lazeez_restaurant_description") }}
        </p>
      </div>
    </div>

    <div class="relative w-full h-full">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="[
          'absolute',
          'inset-0',
          'transition-opacity',
          'duration-700',
          'ease-in-out',
          currentIndex === index ? 'opacity-100' : 'opacity-0',
        ]"
      >
        <img
          :src="image"
          class="w-full h-full object-cover"
          alt="carousel image"
        />
      </div>
    </div>

    <!-- Indicators -->
    <div
      class="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2"
    >
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="[
          'w-3 h-3 rounded-full',
          currentIndex === index ? 'bg-gray-800' : 'bg-gray-400',
        ]"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- Controls -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-white/30 rounded-full group"
    >
      <svg
        class="w-6 h-6 text-white group-hover:text-gray-800"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 1 1 5l4 4"
        />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-white/30 rounded-full group"
    >
      <svg
        class="w-6 h-6 text-white group-hover:text-gray-800"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
    </button>
  </div>
</template>
