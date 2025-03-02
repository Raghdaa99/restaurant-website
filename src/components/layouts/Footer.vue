<template>
  <footer class="bg-[#fcf3e8] text-black px-20 py-10">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-20">        <div class="space-y-3">
          <img src="@/assets/images/LazeezLogo.svg" alt="Lazeez Logo" class="w-20 h-20">
          <h2 class="text-xl font-semibold">{{ $t('footer.welcome_to_lazeez_restaurant') }}</h2>
          <p class="text-sm opacity-80">
            {{ $t('footer.welcome_to_lazeez_restaurant_description') }}
          </p>
        </div>

        <div class="sm:col-span-1 lg:col-span-3 flex flex-col sm:flex-row gap-6 md:gap-10 lg:gap-20">
          <!-- Quick Links -->
          <div class="flex flex-col gap-2 items-start">
            <h2 class="text-lg font-semibold mb-3">{{ $t('footer.quick_links') }}</h2>
            <a href="/" class="hover:text-primary transition">{{ $t('footer.home') }}</a>
            <a href="/reservation" class="hover:text-primary transition">{{ $t('footer.reservation') }}</a>
            <a href="/menu" class="hover:text-primary transition">{{ $t('footer.menu') }}</a>
            <a href="/cart" class="hover:text-primary transition">{{ $t('footer.cart') }}</a>
            <a href="/contact" class="hover:text-primary transition">{{ $t('footer.contact') }}</a>
          </div>

          <!-- Information Links -->
          <div class="flex flex-col gap-2 items-start">
            <h2 class="text-lg font-semibold mb-3">{{ $t('footer.information') }}</h2>
            <a href="/about" class="hover:text-primary transition">{{ $t('footer.about_us') }}</a>
            <a href="/return-policy" class="hover:text-primary transition">{{ $t('footer.return_policy') }}</a>
            <a href="/terms" class="hover:text-primary transition">{{ $t('footer.terms_and_conditions') }}</a>
            <a href="/privacy" class="hover:text-primary transition">{{ $t('footer.privacy_policy') }}</a>
            <a href="/faq" class="hover:text-primary transition">{{ $t('footer.faq') }}</a>
          </div>

          <!-- Contact & Social -->
          <div>
            <h2 class="text-lg font-semibold mb-3">{{ $t('footer.contact') }}</h2>
            <p class="text-sm opacity-80">{{ $t('footer.address') }}: {{ $t('footer.address_details') }}</p>
            <p class="text-sm opacity-80">{{ $t('footer.email') }}: {{ $t('footer.email_details') }}</p>
            <p class="text-sm opacity-80">{{ $t('footer.phone') }}: {{ $t('footer.phone_details') }}</p>

            <!-- Social Links -->
            <div class="flex gap-4 mt-4">
              <a href="#" class="text-black hover:text-primary transition">
                <Facebook class="w-5 h-5" />
              </a>
              <a href="#" class="text-black hover:text-primary transition">
                <Twitter class="w-5 h-5" />
              </a>
              <a href="#" class="text-black hover:text-primary transition">
                <Instagram class="w-5 h-5" />
              </a>
              <a href="#" class="text-black hover:text-primary transition">
                <Youtube class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-sm opacity-75 mt-8">
        {{ $t('footer.copyright') }} © {{ currentYear }} Lazeez. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Facebook, Twitter, Instagram, Youtube } from "lucide-vue-next";
const currentYear = new Date().getFullYear();
</script>
