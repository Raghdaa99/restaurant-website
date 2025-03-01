<template>
  <div
    class="font-salsa scroll-m-6 fixed p-1 font-medium z-10 text-white backdrop-blur-md border-b-[1px] w-full"
    :class="({ 'bg-transparent': isHome, ' bg-primary': !isHome }, $darkClass)"
  >
    <nav class="flex justify-between items-center px-5">
      <!-- Logo -->
      <div>
        <a href="/">
          <img
            class="w-24 h-20 md:w-36 md:h-20"
            :src="logo"
            alt="Lazeez Restaurant Logo"
          />
        </a>
      </div>

      <!-- Mobile Menu Button (bar icon) -->
      <div class="h-10 w-10 md:hidden cursor-pointer" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-8 h-8"
        >
          <path
            fill="#ffffff"
            d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-9">
        <ul
          class="md:flex items-center space-x-9 capitalize dark:hover:text-white"
        >
          <li>
            <a
              class="hover:border border-white rounded-md p-2 hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              href="/"
              >home</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              href="/menu"
              >menu</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2 hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              href="/reservation"
              >reservation</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2 hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              href="/about"
              >about us</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2 hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              href="/contact"
              >contact us</a
            >
          </li>
          <li>
            <router-link to="/cart">
              <Button
                title=""
                icon="shopping-cart"
                to="/cart"
                :class="{
                  'text-white': true,
                  'hover:text-black': !isHome,
                  'hover:text-primary': isHome,
                }"
                class="hover:border border-white rounded-md"
              />
            </router-link>
          </li>
          <li v-if="!userStore.isAuthenticated">
            <a
              href="/signin"
              class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white text-white hover:text-black"
              :class="{ 'hover:text-primary': isHome }"
            >
              Sign In
            </a>
          </li>
          <li v-else>
            <Button
              @click="handleLogout"
              title="Logout"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white"
            />
          </li>

          <li>
            <button
              @click="toggleDark()"
              class="p-2 rounded-md hover:border border-white hover:border border-white rounded-md p-2 dark:hover:text-slate-500"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-20 left-0 w-full bg-black bg-opacity-70 md:hidden flex flex-col items-center py-5"
    >
      <ul
        class="flex flex-col items-center space-y-4 capitalize text-white text-lg"
      >
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/"
            @click="closeMenu"
            >home</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/menu"
            @click="closeMenu"
            >menu</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/reservation"
            @click="closeMenu"
            >reservation</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/about"
            @click="closeMenu"
            >about us</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/contact"
            @click="closeMenu"
            >contact us</a
          >
        </li>
        <li>
          <button
            @click="toggleDark()"
            class="flex items-center space-x-2 hover:border border-white hover:text-primary rounded-md p-2"
          >
            <span v-if="isDark">Light Mode</span>
            <span v-else>Dark Mode</span>
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </li>
        <li>
          <Button
            :class="{
              'text-white': true,
              'hover:text-black': !isHome,
              'hover:text-primary': isHome,
            }"
            class="hover:border border-white rounded-md p-2"
            title=""
            icon="shopping-cart"
            to="/cart"
          />
        </li>

        <li v-if="!userStore.isAuthenticated">
          <router-link to="/signin">
            <Button
              title="Sign In"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome,
                'hover:text-primary': isHome,
              }"
              class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white"
            />
          </router-link>
        </li>

        <li v-else>
          <Button
            @click="handleLogout"
            title="Logout"
            :class="{
              'text-white': true,
              'hover:text-black': !isHome,
              'hover:text-primary': isHome,
            }"
            class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import logo from "@/assets/images/LazeezLogo.svg";
import Button from "../ui/Button.vue";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

const route = useRoute();
const router = useRouter();
const isHome = computed(() => route.name === "Home");

const userStore = useUserStore();
const isUserMenuOpen = ref(false);

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function isCurrentRoute(path: string): boolean {
  return route.path === path;
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

const handleLogout = () => {
  Swal.fire({
    title: "Logout",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      userStore.logout();
      router.push("/");
      closeMenu();
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};
</script>

<style scoped>
.router-link-active {
  color: var(--primary-color);
}
</style>
