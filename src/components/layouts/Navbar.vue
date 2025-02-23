<template>

  <div class="font-salsa  scroll-m-6 fixed p-1 font-medium z-10  text-white backdrop-blur-md border-b-[1px] w-full"
    :class="{ 'bg-transparent': isHome, ' bg-primary  ': !isHome }">
    <nav class="flex  justify-between items-center px-5  ">
      <!-- Logo -->
      <div>
        <a href="/">
          <img class="w-24 h-24 md:w-36 h-28" :src="logo" alt="Lazeez Restaurant Logo" />
        </a>
      </div>

      <!-- Mobile Menu Button (bar icon) -->
      <div class="h-10 w-10 md:hidden cursor-pointer " @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8">
          <path fill="#ffffff"
            d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-9 ">
        <ul class="md:flex items-center space-x-9 capitalize  ">
          <li><a 
              class="hover:border border-white hover:text-primary rounded-md p-2" 
              :class="{ 'text-white': true, 'hover:text-black': !isHome }" 
              href="/">home</a></li>
          <li><a 
              class="hover:border border-white hover:text-primary rounded-md p-2" 
              :class="{ 'text-white': true, 'hover:text-black': !isHome }" 
              href="/menu">menu</a></li>
          <li><a 
              class="hover:border border-white hover:text-primary rounded-md p-2" 
              :class="{ 'text-white': true, 'hover:text-black': !isHome }" 
              href="/about">about us</a></li>
          <li><a 
              class="hover:border border-white hover:text-primary rounded-md p-2" 
              :class="{ 'text-white': true, 'hover:text-black': !isHome }" 
              href="/contact">contact us</a></li>
          <li>
            <Button title="" icon="shopping-cart"
              :class="{ 'text-white': true, 'hover:text-black': !isHome }"
              class="hover:border border-white hover:text-primary rounded-md" />
          </li>
          <li>
            <Button title="Sign In" 
              :class="{ 'text-white': true, 'hover:text-black': !isHome }"
              class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white hover:text-primary" />
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen"
      class="absolute top-20 left-0 w-full bg-black bg-opacity-70  md:hidden flex flex-col items-center py-5 ">
      <ul class="flex flex-col items-center space-y-4 capitalize text-white text-lg">
        <li><a class="hover:border border-white  hover:text-primary rounded-md p-2" href="/" @click="closeMenu">home</a>
        </li>
        <li><a class="hover:border border-white  hover:text-primary rounded-md p-2" href="/menu"
            @click="closeMenu">menu</a></li>
        <li><a class="hover:border border-white  hover:text-primary rounded-md p-2" href="/about"
            @click="closeMenu">about us</a></li>
        <li><a class="hover:border border-white  hover:text-primary rounded-md p-2" href="/contact"
            @click="closeMenu">contact us</a></li>
        <li>
          <Button class="hover:border border-white  hover:text-primary rounded-md p-2" title="" icon="shopping-cart" />
          <!-- <button class="bg-primary w-[100px] h-[40px] text-black rounded-xl shadow capitalize" @click="closeMenu">sign in</button> -->
        </li>
        <li>
          <Button title="Sign In"
            class="flex justify-center items-center  border w-[83px] h-[40px] text-white rounded-xl shadow-2xl capitalize hover:border border-white  hover:text-primary" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import logo from "@/assets/images/LazeezLogo.svg";
import Button from "../ui/Button.vue";
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
