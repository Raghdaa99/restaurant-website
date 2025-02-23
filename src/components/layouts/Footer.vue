<script lang="ts" setup>
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next'
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="font-space-grotesk">
    <div class="flex flex-col py-6 px-6 md:py-2 md:px-10 lg:px-16 mx-auto max-w-7xl bg-primary text-sm">
      <div class="flex flex-col space-y-6">
        <div class="flex flex-wrap justify-center gap-16">
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Catering</a>
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Nutrition</a>
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Gift Cards</a>
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Download Our App</a>
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Careers</a>
        </div>

        <div class="flex flex-wrap justify-center gap-24">
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Investors</a>
          <a href="#" class="text-center text-white hover:text-black transition duration-200">Contact Us</a>
        </div>

        <div class="flex justify-center gap-6 pt-2">
          <a href="#" class="text-white hover:text-black transition duration-200" aria-label="Facebook">
            <Facebook class="w-5 h-5"/>
          </a>
          <a href="#" class="text-white hover:text-black transition duration-200" aria-label="Twitter">
            <Twitter class="w-5 h-5"/>
          </a>
          <a href="#" class="text-white hover:text-black transition duration-200" aria-label="Instagram">
            <Instagram class="w-5 h-5"/>
          </a>
          <a href="#" class="text-white hover:text-black transition duration-200" aria-label="YouTube">
            <Youtube class="w-5 h-5"/>
          </a>
        </div>

        <div class="text-center text-white text-xs mt-2">
          @{{ currentYear }} Lazeez
        </div>
      </div>
    </div>
  </footer>
</template>
