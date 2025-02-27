<template>
  <Button :title="title" icon="shopping-cart" @click="handleAddToCart"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'
import Button from '@/components/UI/Button.vue'

const props = defineProps<{
  item: {
    id: number;
    name: string;
    price: number | string;
    image?: string;
  };
  title?: string;
}>()

const cartStore = useCartStore()

const handleAddToCart = async () => {
  try {
    const cartItem: CartItem = {
      id: props.item.id,
      name: props.item.name,
      price: Number(props.item.price),
      image: props.item.image,
      quantity: 1
    }
    cartStore.addToCart(cartItem)
    Swal.fire({
      icon: 'success',
      title: 'Item added to cart',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  }
}
</script> 
