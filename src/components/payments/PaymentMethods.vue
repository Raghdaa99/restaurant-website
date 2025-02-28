<template>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg">
        Select Payment Method
      </h3>
      <div class="flex border-b mb-4">
        <button
          v-for="method in paymentMethods"
          :key="method.id"
          @click="selectMethod(method.id)"
          class="flex flex-col items-center w-1/3 p-3 border-b-2"
          :class="
            selectedMethod === method.id
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-gray-500'
          "
        >
          <img :src="method.image" :alt="method.name" class="w-15 h-10 mb-1" />
          <span>{{ method.name }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      image: "/src/assets/images/payments/credit-card.png",
    },
    {
      id: "paypal",
      name: "PayPal",
      image: "/src/assets/images/payments/paypal.png",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      image: "/src/assets/images/payments/cash-on.png",
    },
  ];
  
  const selectedMethod = ref("credit-card");
  
  const emit = defineEmits(["select"]);
  
  const selectMethod = (methodId: string) => {
    selectedMethod.value = methodId;
    emit("select", methodId);
  };
  </script>