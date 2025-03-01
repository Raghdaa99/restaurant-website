<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition">
      <span v-if="languageStore.locale === 'en'">English</span>
      <span v-if="languageStore.locale === 'ar'">العربية</span>
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <MenuItems class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
        <MenuItem v-slot="{ active }">
          <button @click="switchLanguage('en')"
            :class="['flex items-center gap-2 w-full px-4 py-2 text-left rounded-t-lg font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
            English <img src="@/assets/images/flags/en.png" alt="English" class="w-4 h-4 ml-1">
          </button>
        </MenuItem>

        <MenuItem v-slot="{ active }">
          <button @click="switchLanguage('ar')"
            :class="['flex items-center gap-2 w-full px-4 py-2 text-left rounded-b-lg font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
            العربية <img src="@/assets/images/flags/ar.png" alt="Arabic" class="w-4 h-4 ml-1">
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { ref, watchEffect } from "vue";

const languageStore = useLanguageStore();
const selectedLanguage = ref(languageStore.locale);

const switchLanguage = (lang: string) => {
  if (languageStore.locale !== lang) {
    languageStore.setLanguage(lang);
  }
};

watchEffect(() => {
  selectedLanguage.value = languageStore.locale;
});
</script>
