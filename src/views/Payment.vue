<template>
    <div class="min-h-screen bg-slate-100">
      <div
        class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-12 mt-24"
      >
        <div class="flex items-center gap-4 mb-8">
          <div class="bg-primary/10 p-3 rounded-full">
            <i class="fas fa-credit-card text-xl sm:text-2xl text-primary"></i>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">{{ $t('checkout.payment') }}</h1>
        </div>
  
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-6"
        >
          <div class="md:col-span-2 lg:col-span-2">
            <PaymentMethods @select="selectedMethod = $event" />
            <div
              class="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <CreditCardForm
                v-if="selectedMethod === 'credit-card'"
                @submit="handleCreditCardPayment"
              />
              <PayPalPayment
                v-else-if="selectedMethod === 'paypal'"
                @submit="handlePayPalPayment"
              />
              <CashOnDelivery
                v-else-if="selectedMethod === 'cod'"
                @submit="handleCashOnDelivery"
              />
            </div>
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import OrderSummary from "@/components/checkout/OrderSummary.vue";
  import PaymentMethods from "@/components/payments/PaymentMethods.vue";
  import CreditCardForm from "@/components/payments/CreditCardForm.vue";
  import PayPalPayment from "@/components/payments/PayPalPayment.vue";
  import CashOnDelivery from "@/components/payments/CashOnDelivery.vue";
  import { usePayment } from "@/composables/usePayment";
  
  const selectedMethod = ref("credit-card");
  const { processPayment } = usePayment();
  
  const handleCreditCardPayment = async (cardDetails: any) => {
    await processPayment("credit-card");
  };
  
  const handlePayPalPayment = async () => {
    await processPayment("paypal");
  };
  
  const handleCashOnDelivery = async () => {
    await processPayment("cash-on-delivery");
  };
  </script>