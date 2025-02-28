import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import { useCart } from "./useCart";

export function useCheckoutGuard() {
  const userStore = useUserStore();

  const router = useRouter();

  const validateCheckoutAccess = () => {
    if (!userStore.isAuthenticated) {
      toastr.error("You must be signed in to proceed to checkout.");
      router.push("/signin");
      return false;
    }

    if (useCart().isEmpty.value) {
      toastr.error("Your cart is empty. Add items before checkout.");
      router.push("/cart");
      return false;
    }

    return true;
  };

  return { validateCheckoutAccess };
}
