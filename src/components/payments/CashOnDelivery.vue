<template>
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">Cash on Delivery</h3>
      <Button
        class="w-full"
        @click="handlePayment"
        title="Confirm Order"
      ></Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import Button from "@/components/UI/Button.vue";
  
  const emit = defineEmits(["submit"]);
  
  const handlePayment = () => {
    emit("submit");
  };
  </script>