import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem } from '@/types/food';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartItem[]>([]);

    function addToCart(item: CartItem) {
        const existingItem = cart.value.find((p) => p.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.value.push({ ...item });
        }
    }

    function removeFromCart(id: number) {
        cart.value = cart.value.filter((item) => item.id !== id);
    }

    function updateQuantity(id: number, quantity: number) {
        const item = cart.value.find((p) => p.id === id);
        if (item) item.quantity = Math.max(quantity, 1);
    }

    function clearCart() {
        cart.value = [];
    }

    const totalPrice = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    const totalItems = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    function totalPriceItem(id: number) {
        const item = cart.value.find((p) => p.id === id);
        return item ? item.price * item.quantity : 0;
    }

    function increaseQuantity(id: number) {
        const item = cart.value.find((p) => p.id === id);
        if (item) {
            item.quantity += 1;
        }
    }

    function decreaseQuantity(id: number) {
        const item = cart.value.find((p) => p.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        }
    }

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPriceItem,
        totalPrice,
        totalItems,
        increaseQuantity,
        decreaseQuantity,
    };
}, {
    persist: true, 
});
