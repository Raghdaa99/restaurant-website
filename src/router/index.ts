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
  ],
})

export default router
