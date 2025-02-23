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
      path: "/signin",
      name: "", 
      component: () => import("@/views/ContactUs.vue"),
    },
    { 
      path: "/signup",
      name: "", 
      component: () => import("@/views/ContactUs.vue"),
    },
  ],
})

export default router
