<template>
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">Pay with PayPal</h3>
      <Button
        class="w-full"
        @click="handlePayment"
        title="Pay Now with PayPal"
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


