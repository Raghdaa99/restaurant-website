import { useCheckoutGuard } from "@/composables/useCheckoutGuard";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { useLanguageStore } from "@/stores/useLanguageStore";


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
  // Handle language direction (RTL/LTR)
  const languageStore = useLanguageStore();
  document.documentElement.setAttribute("dir", languageStore.locale === "ar" ? "rtl" : "ltr");
  const userStore = useUserStore();

  if (to.name === "Checkout" || to.name === "Payment") {
    const { validateCheckoutAccess } = useCheckoutGuard();
    if (validateCheckoutAccess()) {
      next();
    } else {
      next(false); // Prevent access if validation fails
    }
  } 
  // Prevent logged-in users from accessing the SignIn page
  else if (to.name === "SignIn") {
    // Check if the user is already logged in
    if (userStore.isAuthenticated || localStorage.getItem("token")) {
      // Redirect user to the homepage or dashboard if they are already logged in
      next({ name: "Home" });
    } else {
      // Allow access to the SignIn page if the user is not logged in
      next();
    }
  } else {
    // Allow access to all other routes
    next();
  }
});

export default router;
