<script setup lang="ts">
import { useCart } from "@/composables/useCart";
import { useI18n } from "vue-i18n";

const { cartItems, subtotal, tax, total } = useCart();
const { locale } = useI18n();
</script>

<template>
  <div class="md:col-span-2 lg:col-span-1">
    <h3 class="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg">
      {{ $t('checkout.yourOrder') }}
    </h3>
    <div class="bg-white p-6 shadow-lg rounded-xl mt-2">
      <div v-if="cartItems.length > 0" class="space-y-6">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-800">
            {{ $t('checkout.itemsInYourOrder') }}
          </h3>
          <hr class="my-3 border-gray-300" />
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.name[locale] }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ $t('checkout.quantity') }}: {{ item.quantity }}
                </p>
              </div>
            </div>
            <span class="text-lg font-semibold text-primary"
              >${{ item.price * item.quantity }}</span
            >
          </div>
        </div>
        <hr class="my-3 border-gray-300" />
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('checkout.orderSummary') }}</h2>
        <div class="space-y-3">
          <div class="flex justify-between text-gray-600">
            <span>{{ $t('checkout.subtotal') }}</span>
            <span class="font-medium text-gray-900"
              >${{ subtotal.toFixed(2) }}</span
            >
          </div>
          <div class="flex justify-between text-gray-600">
            <span>{{ $t('checkout.tax') }}</span>
            <span class="font-medium text-gray-900">${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>{{ $t('checkout.shipping') }}</span>
            <span class="font-medium text-gray-900"> Free </span>
          </div>
          <hr class="my-3 border-gray-300" />
          <div class="flex justify-between text-lg font-bold text-gray-900">
            <span>{{ $t('checkout.total') }}</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
