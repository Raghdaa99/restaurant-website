<template>
 <footer class="font-salsa text-white bg-primary dark:border-t border-t-white" :class="$darkClass">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <a
            href="/contact"
            class="md:min-w-32 lg:min-w-40 text-center hover:text-shadow-md"
          >
            Contact Us
          </a>
          <a
            href="/about"
            class="md:min-w-32 lg:min-w-40 text-center hover:text-gray/80"
          >
            About Us
          </a>
          <a
            href="/menu"
            class="md:min-w-32 lg:min-w-40 text-center hover:text-gray/80"
          >
            Menu
          </a>
          <a
            href="#"
            class="md:min-w-32 lg:min-w-40 text-center hover:text-gray/80"
          >
            Download Our App
          </a>
          <a
            href="#"
            class="md:min-w-32 lg:min-w-40 text-center hover:text-gray/80"
          >
            Careers
          </a>
        </div>

        <div class="flex flex-wrap justify-center gap-24">
          <a
            href="#"
            class="text-center text-white hover:text-black transition duration-200"
            >Investors</a
          >
          <a
            href="#"
            class="text-center text-white hover:text-black transition duration-200"
            >Contact Us</a
          >
        </div>

        <div class="flex justify-center gap-6 pt-2">
          <a
            href="#"
            class="text-white hover:text-black transition duration-200"
            aria-label="Facebook"
          >
            <Facebook class="w-5 h-5" />
          </a>
          <a
            href="#"
            class="text-white hover:text-black transition duration-200"
            aria-label="Twitter"
          >
            <Twitter class="w-5 h-5" />
          </a>
          <a
            href="#"
            class="text-white hover:text-black transition duration-200"
            aria-label="Instagram"
          >
            <Instagram class="w-5 h-5" />
          </a>
          <a
            href="#"
            class="text-white hover:text-black transition duration-200"
            aria-label="YouTube"
          >
            <Youtube class="w-5 h-5" />
          </a>
        </div>

        <div class="text-center text-white text-xs mt-2">
          @{{ currentYear }} Lazeez
        </div>
      </div>
  </footer>
</template>

<script lang="ts" setup>
import { Facebook, Twitter, Instagram, Youtube } from "lucide-vue-next";
const currentYear = new Date().getFullYear();
</script>
