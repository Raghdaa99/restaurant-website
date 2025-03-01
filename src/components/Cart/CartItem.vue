<template>
  <div
    class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 sm:p-4 border-b border-slate-300 last:border-b-0 hover:bg-slate-300/50 transition-all duration-300"
  >
    <div class="col-span-12 md:col-span-6 flex items-center gap-3 sm:gap-4">
      <img
        :src="item.image"
        :alt="item.name[locale]"
        class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm ring-1 ring-slate-400/20"
      />
      <div>
        <h3 class="font-semibold text-base sm:text-lg text-slate-800">
          {{ item.name[locale] }}
        </h3>
        <p class="text-sm sm:text-base text-slate-600">
          ${{ formatPrice(item.price) }}
        </p>
      </div>
    </div>

    <!-- Mobile Price (Visible on small screens) -->
    <div class="md:hidden flex justify-between items-center text-slate-800">
      <span class="text-sm font-medium">{{ $t("cart.price") }}:</span>
      <span class="font-medium"
        >${{ formatPrice(item.price * item.quantity) }}</span
      >
    </div>

    <!-- Quantity Column -->
    <div
      class="col-span-12 md:col-span-3 flex items-center md:justify-center gap-2"
    >
      <span class="text-sm md:hidden">{{ $t("cart.quantity") }}:</span>
      <div
        class="flex items-center bg-slate-100 rounded-lg border border-slate-300 shadow-sm"
      >
        <button
          @click="$emit('decrease', item.id)"
          class="px-2 sm:px-3 py-1 sm:py-2 hover:bg-slate-200 rounded-l-lg transition-colors"
        >
          -
        </button>
        <span class="w-8 sm:w-12 text-center py-1 sm:py-2 text-slate-700">{{
          item.quantity
        }}</span>
        <button
          @click="$emit('increase', item.id)"
          class="px-2 sm:px-3 py-1 sm:py-2 hover:bg-slate-200 rounded-r-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>

    <!-- Total Price Column (Hidden on mobile) -->
    <div class="hidden md:flex col-span-3 items-center justify-between">
      <span class="font-medium text-slate-800 md:ml-auto">
        ${{ formatPrice(item.price * item.quantity) }}
      </span>
      <button
        @click="$emit('remove', item.id)"
        class="text-red-500 hover:text-red-700 p-2 transition-colors"
        title="Remove item"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <!-- Remove Button (Visible on mobile) -->
    <div class="md:hidden flex justify-end">
      <button
        @click="$emit('remove', item.id)"
        class="text-red-500 hover:text-red-700 p-2 transition-colors"
        title="Remove item"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

defineProps<{
  item: {
    id: number;
    name: {
      en: string;
      ar: string;
    };
    price: number;
    image: string;
    quantity: number;
  };
}>();

defineEmits<{
  (e: "increase", id: number): void;
  (e: "decrease", id: number): void;
  (e: "remove", id: number): void;
}>();

const formatPrice = (price: number): string => {
  return Number(price).toFixed(2);
};
</script>
