<template>
  <div class="flex flex-col min-h-screen">
    <div class="relative">
      <Navbar/>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/layouts/Navbar.vue";

    
</script>