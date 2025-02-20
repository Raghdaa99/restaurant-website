<template>
  <div class="flex flex-col min-h-screen">
    <div class="relative">
      <Navbar/>
    </div>
    <div class="z-0">
        <Header />
      </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Navbar from "@/components/Navbar/index.vue";

    
</script>