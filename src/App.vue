<template>
  <div class="flex flex-col min-h-screen font-salsa dark:bg-slate-900" >
    <div class="relative">
      <Navbar />
    </div>
    <router-view />
    <div>
      <ChatBot />
    </div>
    <div>
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue"
import ChatBot from "@/components/layouts/ChatBot.vue"

import { useLanguageStore } from "@/stores/useLanguageStore";
import { watch, onMounted } from "vue";

const languageStore = useLanguageStore();
const updateDirection = () => {
  document.documentElement.setAttribute("dir", languageStore.locale === "ar" ? "rtl" : "ltr");
};
watch(() => languageStore.locale, updateDirection, { immediate: true });
onMounted(updateDirection);
</script>

