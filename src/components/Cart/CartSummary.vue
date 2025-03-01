<template>
  <div class="bg-slate-200/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-xl h-fit border border-slate-300/20">
    <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-slate-300 flex items-center gap-2 text-slate-800">
      <i class="fas fa-receipt text-primary"></i>
      {{ $t('cart.orderSummary') }}
    </h2>
    <div class="space-y-3 sm:space-y-4">
      <div class="flex justify-between text-slate-600">
        <span>{{ $t('cart.subtotal') }}</span>
        <span>${{ formatPrice(subtotal) }}</span>
      </div>
      <div class="flex justify-between text-slate-600">
        <span>{{ $t('cart.tax') }} (10%)</span>
        <span>${{ formatPrice(tax) }}</span>
      </div>
      <div class="border-t border-slate-300 pt-3 sm:pt-4 mt-3 sm:mt-4">
        <div class="flex justify-between text-base sm:text-lg font-semibold text-slate-800">
          <span>{{ $t('cart.total') }}</span>
          <span>${{ formatPrice(total) }}</span>
        </div>
      </div>
    </div>
    <button 
      @click="$emit('checkout')"
      class="w-full bg-primary hover:text-primary hover:bg-white hover:border-2 hover:border-primary text-white py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
    >
      <span>{{ $t('cart.proceedToCheckout') }}</span>
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  subtotal: number;
  tax: number;
  total: number;
}

const props = withDefaults(defineProps<Props>(), {
  subtotal: 0,
  tax: 0,
  total: 0
})

defineEmits<{
  (e: 'checkout'): void
}>()

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}
</script>