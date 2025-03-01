<template>
  <div id="navbar"
    class="font-salsa scroll-m-6 fixed p-1 font-medium z-40 text-white backdrop-blur-md border-b-[1px] w-full transition-all duration-500 ease-in-out dark:bg-slate-900"
    :class="{
      'bg-transparent': isHome && !isScrolled,
      'bg-primary': (isHome && isScrolled) || !isHome
    }"
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
        <ul class="md:flex items-center space-x-9 capitalize">
          <li>
            <a
              class="hover:border border-white rounded-md p-2"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,

              }"
              href="/"
              >{{ t('home') }}</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
              }"
              href="/menu"
              >{{ t('menu') }}</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
              }"
              href="/reservation"
              >{{ t('reservation') }}</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
              }"
              href="/about"
              >{{ t('about_us') }}</a
            >
          </li>
          <li>
            <a
              class="hover:border border-white rounded-md p-2"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
              }"
              href="/contact"
              >{{ t('contact_us') }}</a
            >
          </li>
          <!-- <li>
            <router-link to="/cart">
              <Button
                title=""
                icon="shopping-cart"
                to="/cart"
                :class="{
                  'text-white': true,
                  'hover:text-black': !isHome || (isHome && isScrolled),
                  'hover:text-primary': isHome && !isScrolled,
                }"
                class="hover:border border-white rounded-md"
              />
            </router-link>
          </li>
          <li v-if="!userStore.isAuthenticated">
            <router-link to="/signin">
              <Button
                :title="t('sign_in')"
                :class="{
                  'text-white': true,
                  'hover:text-black': !isHome || (isHome && isScrolled),
                  'hover:text-primary': isHome && !isScrolled,
                }"
                class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white"
              />
            </router-link>
          </li>
          <li v-else>
            <Button
              @click="handleLogout"
              :title="t('logout')"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
              }"
              class="flex justify-center items-center border w-[83px] h-[40px] rounded-xl shadow-2xl capitalize hover:border border-white"
            />
          </li>
          <li>
            <button
              @click="toggleDark()"
              class="p-2 rounded-md hover:border border-white"
              :class="{
                'text-white': true,
                'hover:text-black': !isHome || (isHome && isScrolled),
                'hover:text-primary': isHome && !isScrolled,
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
          <li>
            <LanguageSwitcher />
          </li> -->
          <li>
            <NavbarMenu />
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
            >{{ t('home') }}</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/menu"
            @click="closeMenu"
            >{{ t('menu') }}</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/reservation"
            @click="closeMenu"
            >{{ t('reservation') }}</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/about"
            @click="closeMenu"
            >{{ t('about_us') }}</a
          >
        </li>
        <li>
          <a
            class="hover:border border-white hover:text-primary rounded-md p-2"
            href="/contact"
            @click="closeMenu"
            >{{ t('contact_us') }}</a
          >
        </li>
        <li>
          <button
            @click="toggleDark()"
            class="flex items-center space-x-2 hover:border border-white hover:text-primary rounded-md p-2"
          >
            <span v-if="isDark">{{ t('light_mode') }}</span>
            <span v-else>{{ t('dark_mode') }}</span>
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
              :title="t('sign_in')"
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
            :title="t('logout')"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import logo from "@/assets/images/LazeezLogo.svg";
import Button from "../ui/Button.vue";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import { useDark, useToggle } from "@vueuse/core";
import LanguageSwitcher from "../UI/LanguageSwitcher.vue"; 
import NavbarMenu from "@/components/layouts/NavbarMenu.vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

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

// Change navbar background color when scrolling
const isScrolled = ref(false);
const handleScroll = () => {
  const heroSection = document.getElementById("indicators-carousel");
  const navbar = document.getElementById("navbar");
  if (heroSection && navbar) {
    const heroHeight = heroSection.offsetHeight;
    const navbarHeight = navbar.offsetHeight;
    isScrolled.value = window.scrollY > heroHeight - navbarHeight;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});


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