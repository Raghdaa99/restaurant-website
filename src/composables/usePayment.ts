import { useOrderStore } from "@/stores/useOrderStore";
import { useRouter } from "vue-router";
import { useCart } from "./useCart";
export function usePayment() {
  const orderStore = useOrderStore();
  const router = useRouter();

  const isOrderValid = () => {
    if (!orderStore.currentOrder?.address) {
      toastr.error("Please complete shipping details before proceeding in Checkout page.");
      return false;
    }
    if (useCart().isEmpty.value) {
      toastr.error("Your cart is empty. Add items before proceeding.");
      return false;
    }
    return true;
  };

  const processPayment = async (method: "credit-card" | "paypal" | "cash-on-delivery") => {
    if (!isOrderValid()) return;

    orderStore.updateOrder({
      paymentMethod: method,
      paymentStatus: "Pending",
    });

    await orderStore.confirmOrder();

    if (method === "paypal") {
      window.open("https://paypal.com", "_blank");
    }

    router.push("/order-confirmation");
  };

  return {
    processPayment,
  };
}
