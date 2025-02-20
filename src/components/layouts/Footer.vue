<script lang="ts" setup>
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next'
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="font-space-grotesk">
    <div class="flex flex-col py-8 px-6 md:py-10 md:px-12 lg:px-20 mx-auto max-w-7xl bg-primary">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Catering
          </a>
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Nutrition
          </a>
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Gift Cards
          </a>
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Download Our App
          </a>
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Careers
          </a>
        </div>

        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Investors
          </a>
          <a href="#" class="md:min-w-32 lg:min-w-40 text-center text-gray hover:text-gray/80">
            Contact Us
          </a>
        </div>

        <div class="flex justify-center gap-4 w-full pt-4">
          <a href="#" class="text-gray hover:text-gray/80" aria-label="Facebook">
            <Facebook class="w-5 h-5 md:w-6 md:h-6"/>
          </a>
          <a href="#" class="text-gray hover:text-gray/80" aria-label="Twitter">
            <Twitter class="w-5 h-5 md:w-6 md:h-6"/>
          </a>
          <a href="#" class="text-gray hover:text-gray/80" aria-label="Instagram">
            <Instagram class="w-5 h-5 md:w-6 md:h-6"/>
          </a>
          <a href="#" class="text-gray hover:text-gray/80" aria-label="YouTube">
            <Youtube class="w-5 h-5 md:w-6 md:h-6"/>
          </a>
        </div>

        <div class="text-center text-gray mt-4">
          @{{ currentYear }} Lazeez
        </div>
      </div>
    </div>
  </footer>
</template>
