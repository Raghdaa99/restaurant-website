<template>
  <div
    class="font-Salsa font-medium z-10 absolute text-white backdrop-blur-md border-b-[1px] w-full"
    :class="{ 'bg-transparent': isHome, 'bg-slate-400 ': !isHome }"
  >
    <nav class="flex justify-between items-center px-5">
      <!-- Logo -->
      <div>
        <img class="w-24 h-24 md:w-36 h-28" :src="logo" alt="Lazeez Restaurant Logo" />
      </div>

      <!-- Mobile Menu Button -->
      <div class="h-10 w-10 md:hidden cursor-pointer" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8">
          <path
            fill="#ffffff"
            d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-9">
        <ul class="md:flex items-center space-x-9 capitalize">
          <li><a href="#">home</a></li>
          <li><a href="#">menu</a></li>
          <li><a href="#">about us</a></li>
          <li><a href="#">contact us</a></li>
          <li>
            <button class="bg-primary w-[83px] h-[40px] text-white rounded-xl shadow-2xl capitalize">sign in</button>
          </li>
          <li>
            <button class="border w-[83px] h-[40px] text-white rounded-xl shadow-2xl capitalize">sign up</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="absolute top-20 left-0 w-full bg-black bg-opacity-40 md:hidden flex flex-col items-center space-y-4 py-5">
      <ul class="flex flex-col space-y-4 capitalize text-white text-lg">
        <li><a href="#" @click="closeMenu">home</a></li>
        <li><a href="#" @click="closeMenu">menu</a></li>
        <li><a href="#" @click="closeMenu">about us</a></li>
        <li><a href="#" @click="closeMenu">contact us</a></li>
        <li>
          <button class="bg-primary w-[100px] h-[40px] text-black rounded-xl shadow capitalize" @click="closeMenu">sign in</button>
        </li>
        <li>
          <button class="bg-slate-500 border w-[100px] h-[40px] text-black rounded-xl shadow-2xl capitalize" @click="closeMenu">sign up</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import logo from "@/assets/images/LazeezLogo.svg";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

const route = useRoute();
const isHome = computed(() => route.name === "Home");
</script>

<style scoped></style>
