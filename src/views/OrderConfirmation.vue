<template>
    <div class="min-h-screen bg-slate-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 class="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p class="text-gray-700">Thank you for your purchase.</p>
        <Button
          class="mt-4"
          title="Back to Home"
          @click="$router.push('/')"
        ></Button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  import Button from "@/components/UI/Button.vue";
  
  const router = useRouter();
  </script>