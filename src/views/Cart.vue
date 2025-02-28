<template>
  <div class="min-h-screen bg-slate-100" :class="$darkClass">
    <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-12 mt-24">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="bg-primary/10 p-3 rounded-full">
          <i class="fas fa-shopping-cart text-xl sm:text-2xl text-primary"></i>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Shopping Cart</h1>
      </div>

      <!-- Cart -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div class="lg:col-span-2">
          <!-- Table Header -->
          <div class="hidden md:grid grid-cols-12 gap-2 md:gap-4 text-center bg-slate-300/80 backdrop-blur-sm py-3 md:py-4 px-4 md:px-6 rounded-t-xl font-semibold text-slate-700 shadow-lg">
            <div class="col-span-6 text-left pl-4">Food Item</div>
            <div class="col-span-3 text-center">Quantity</div>
            <div class="col-span-3 text-right pr-4">Total Price</div>
          </div>
          
          <!-- Cart Content -->
          <div class="bg-slate-200/80 backdrop-blur-sm rounded-b-xl shadow-lg">
            <div v-if="isEmpty" class="text-center py-8 sm:py-12">
              <img 
                src="@/assets/images/empty-cart.svg" 
                alt="Empty Cart" 
                class="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 opacity-80"
              >
              <div class="text-base sm:text-lg text-slate-700 mb-2">Your cart is empty</div>
              <div class="text-sm sm:text-base text-slate-600 mb-4 px-4">Looks like you haven't added any items to your cart yet.</div>
              <router-link 
                to="/" 
                class="inline-flex items-center gap-2 bg-primary text-white rounded-md hover:text-primary hover:bg-white hover:border hover:border-primary px-4 sm:px-6 py-2 transition-all duration-300 text-sm"
              >
                <i class="fas fa-arrow-left"></i>
                <span>Continue Shopping</span>
              </router-link>
            </div>

            <!-- Cart Items -->
            <div v-else class="space-y-4 p-3 sm:p-4">
              <CartItem 
                v-for="item in cartItems" 
                :key="item.id"
                :item="item"
                @increase="handleIncreaseQuantity"
                @decrease="handleDecreaseQuantity"
                @remove="handleRemoveItem"
              />
            </div>
          </div>
        </div>

        <!-- Cart Summary Card -->
        <div class="mt-4 lg:mt-0">
          <CartSummary 
            :subtotal="subtotal"
            :tax="tax"
            :total="total"
            @checkout="handleCheckout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart'
import CartItem from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'

const {
  cartItems,
  subtotal,
  tax,
  total,
  isEmpty,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
  handleCheckout
} = useCart()
</script>

