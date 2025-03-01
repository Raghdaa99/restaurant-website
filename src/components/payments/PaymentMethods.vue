<template>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg">
        {{ $t('checkout.selectPaymentMethod') }}  
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
          <img :src="method.image" :alt="method.name[locale]" class="w-15 h-10 mb-1" />
          <span>{{ method.name[locale] }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  const { locale } = useI18n();

  const paymentMethods = [
    {
      id: "credit-card",
      name: { en: "Credit Card", ar: "بطاقة الائتمان" },
      image: "/src/assets/images/payments/credit-card.png",
    },
    {
      id: "paypal",
      name: { en: "PayPal", ar: "بايبال" },
      image: "/src/assets/images/payments/paypal.png",
    },
    {
      id: "cod",
      name: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
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