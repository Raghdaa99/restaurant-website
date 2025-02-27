<template>
  <div class="flex flex-col min-h-screen font-salsa" >
    <div class="relative">
      <Navbar />
    </div>
    <router-view />
    <ChatBot />
    <div>
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue"
import ChatBot from "@/components/layouts/ChatBot.vue"
</script>
