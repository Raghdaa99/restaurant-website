import { createRouter, createWebHistory } from 'vue-router'

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
  ],
})

export default router
