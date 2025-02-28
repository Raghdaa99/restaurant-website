import { useCheckoutGuard } from "@/composables/useCheckoutGuard";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/views/ContactUs.vue"),
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/Cart.vue"),
    },
    {
      path: "/food/:id",
      name: "Food-Details",
      component: () => import("@/views/FoodDetails.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/ErrorNotFound.vue"),
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("@/views/Menu.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutUs.vue"),
    },
    {
      path: "/reservation",
      name: "Reservation",
      component: () => import("@/views/Reservation.vue"),
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("@/views/Checkout.vue"),
    },
    {
      path: "/payment",
      name: "Payment",
      component: () => import("@/views/Payment.vue"),
    },
    {
      path: "/order-confirmation",
      name: "OrderConfirmation",
      component: () => import("@/views/OrderConfirmation.vue"),
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("@/components/auth/SignUp.vue"),
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("@/components/auth/SignIn.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "Checkout" || to.name === "Payment" || to.name === "OrderConfirmation") {
    const { validateCheckoutAccess } = useCheckoutGuard();
    if (validateCheckoutAccess()) {
      next();
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});
export default router;
