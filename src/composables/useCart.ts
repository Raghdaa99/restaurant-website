import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from "vue-router";

export function useCart() {
    const cartStore = useCartStore()
    const router = useRouter();
    const subtotal = computed(() => cartStore.totalPrice)
    const tax = computed(() => subtotal.value * 0.1)
    const total = computed(() => subtotal.value + tax.value)
    const isEmpty = computed(() => cartStore.cart.length === 0)

    const isItemInCart = (id: number) => {
        return cartStore.cart.some(item => item.id === id)
    }

    const getQuantity = (id: number) => {
        const item = cartStore.cart.find(item => item.id === id)
        return item ? item.quantity : 0
    }

    const handleIncreaseQuantity = (id: number) => {
        cartStore.increaseQuantity(id)
    }

    const handleDecreaseQuantity = (id: number) => {
        cartStore.decreaseQuantity(id)
    }

    const handleRemoveItem = (id: number) => {
        cartStore.removeFromCart(id)
    }

    const handleCheckout = () => {
        router.push('/checkout')
        // console.log('Proceeding to checkout...')
    }

    return {
        cartItems: computed(() => cartStore.cart),
        subtotal,
        tax,
        total,
        isEmpty,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleCheckout,
        isItemInCart,
        getQuantity
    }
} 