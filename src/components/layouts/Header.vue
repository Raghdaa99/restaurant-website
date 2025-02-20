<template>
    <div id="indicators-carousel" class="relative w-full h-screen overflow-hidden" data-carousel="static">
      <!-- Carousel wrapper -->
      <div class="relative w-full h-full">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['absolute', 'inset-0', 'transition-opacity', 'duration-700', 'ease-in-out', currentIndex === index ? 'opacity-100' : 'opacity-0']"
        >
          <img :src="image" class="w-full h-full object-cover" alt="carousel image">
        </div>
      </div>
  
      <!-- Indicators -->
      <div class="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        <button
          v-for="(image, index) in images"
          :key="index"
          :class="['w-3 h-3 rounded-full', currentIndex === index ? 'bg-gray-800' : 'bg-gray-400']"
          @click="goToSlide(index)"
        ></button>
      </div>
  
      <!-- Controls -->
      <button @click="prevSlide" class="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-white/30 rounded-full group">
        <svg class="w-6 h-6 text-white group-hover:text-gray-800" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
      </button>
      <button @click="nextSlide" class="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-white/30 rounded-full group">
        <svg class="w-6 h-6 text-white group-hover:text-gray-800" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fusion6.com.au%2Fwp-content%2Fuploads%2F2021%2F04%2FIndian-Dishes-You-Need-to-Try.jpg&f=1&nofb=1&ipt=35cd6ede7c38793575eeb1c88b972bdc366b707ef4835cf902ac9bc57ea8ad82&ipo=images",                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbsmedia.business-standard.com%2F_media%2Fbs%2Fimg%2Farticle%2F2023-09%2F14%2Ffull%2F1694673859-4182.jpeg%3Fim%3DFeatureCrop%2Csize%3D(826%2C465)&f=1&nofb=1&ipt=c9ddcb3fa9fc188054470c436baba3d78061e0873e64ae372afec8503cb7ec0d&ipo=images",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3724311.jpg&f=1&nofb=1&ipt=1074d2e8cdbbbececc8f5c1afafb4dde4fce4bdfdfba160a381b69618ecd747f&ipo=images",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic1.bigstockphoto.com%2F8%2F1%2F3%2Flarge1500%2F318491239.jpg&f=1&nofb=1&ipt=ca46e2c4995b49cb56b7206a645d5f4e22f9ffca2f59352a6abd639fa2d4231b&ipo=images",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3376127.jpg&f=1&nofb=1&ipt=5b2ec110c5f53dcacd802e2491b5e7f55fce297eb7975dc7b1ce80c521aecd21&ipo=images"
        ],
        currentIndex: 0,
        interval: null, 
      };
    },
    methods: {
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      goToSlide(index) {
        this.currentIndex = index;
      },
      startAutoSlide() {
        this.interval = setInterval(() => {
          this.nextSlide();
        }, 3000); // Cycle every 5 seconds
      },
      stopAutoSlide() {
        clearInterval(this.interval);
      }
    },
    mounted() {
      this.startAutoSlide();
    },
    beforeUnmount() {
      this.stopAutoSlide(); // Clean up when component is destroyed
    }
  };
  </script>
  
  <style scoped>
  /* No additional styles needed since Tailwind is handling everything */
  </style>
  