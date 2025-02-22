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
        path: "/reservation",
        name: "Reservation", 
        component: () => import("@/views/Reservation.vue"),
      },  { 
        path: "/signup",
        name: "SignUp", 
        component: () => import("@/components/auth/SignUp.vue"),
      },
    ],
  })

  export default router
