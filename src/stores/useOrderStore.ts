import { defineStore } from "pinia";
import { ref } from "vue";
import type { OrderInfo } from "@/types/food";
import {
  createOrder as createOrderApi,
  getOrders as getOrdersApi,
} from "@/services/ordersServices";
import { useCartStore } from "./cart";

export const useOrderStore = defineStore(
  "order",
  () => {
    const orders = ref<OrderInfo[]>([]);
    const currentOrder = ref<Partial<OrderInfo> | null>(null);

    const fetchOrders = async () => {
      try {
        const data = await getOrdersApi();
        orders.value = data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const createOrder = (order: Partial<OrderInfo>) => {
      try {
        currentOrder.value = order;
        orders.value.push(currentOrder.value as OrderInfo);
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    };

    const updateOrder = (updates: Partial<OrderInfo>) => {
      if (currentOrder.value) {
        currentOrder.value = { ...currentOrder.value, ...updates };
      }
    };

    const confirmOrder = async () => {
      if (currentOrder.value) {
        try {
          currentOrder.value.status = "Paid";
          currentOrder.value.paymentStatus = "Success";
          currentOrder.value.createdAt = new Date().toISOString();
        
          const confirmedOrder = await createOrderApi(
            currentOrder.value as OrderInfo
          );
          orders.value.push(confirmedOrder);
          currentOrder.value = null;
          useCartStore().clearCart();
        } catch (error) {
          console.error("Error confirming order:", error);
          throw error;
        }
      }
    };

    return {
      orders,
      currentOrder,
      fetchOrders,
      createOrder,
      updateOrder,
      confirmOrder,
    };
  },
  {
    persist: true,
  }
);
