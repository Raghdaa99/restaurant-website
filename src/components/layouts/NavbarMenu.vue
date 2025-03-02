<template>
      <Menu as="div" class="relative inline-block text-start">
        <MenuButton class="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-white hover:text-primary transition">
          <span>{{ $t('account') }}</span>
          <ChevronDownIcon class="w-5 h-5 text-gray-300" />
        </MenuButton>
  
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <MenuItems class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
            <!-- Cart -->
            <MenuItem v-slot="{ active }">
              <button
                @click="router.push('/cart')"
                :class="['flex items-center gap-2 w-full px-4 py-2 text-left rounded-t-lg font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
                <ShoppingCartIcon class="w-5 h-5" />
                {{ t('carts') }}
              </button>
            </MenuItem>
            <!-- Sign In / Logout -->
            <MenuItem v-slot="{ active }">
              <button
                v-if="!userStore.isAuthenticated"
                @click="router.push('/signin')"
                :class="['flex items-center gap-2 w-full px-4 py-2 text-left rounded-t-lg font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
                <ArrowLeftOnRectangleIcon class="w-5 h-5" />
                {{ t('sign_in') }}
              </button>
  
              <button
                v-else
                @click="handleLogout"
                :class="['flex items-center gap-2 w-full px-4 py-2 text-left font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                {{ t('logout') }}
              </button>
            </MenuItem>
  
            <!-- Dark Mode Toggle -->
            <MenuItem v-slot="{ active }">
              <button
                @click="toggleDark()"
                :class="['flex items-center gap-2 w-full px-4 py-2 text-left font-medium transition', active ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-800']">
                <SunIcon v-if="isDark" class="w-5 h-5" />
                <MoonIcon v-else class="w-5 h-5" />
                {{ isDark ? t('light_mode') : t('dark_mode') }}
              </button>
            </MenuItem>
  
            <!-- Language Switcher -->
            <MenuItem v-slot="{ active }">
              <div :class="['px-4 py-2', active ? 'bg-gray-100' : 'hover:bg-primary hover:text-white text-gray-800']">
                <LanguageSwitcher />
              </div>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
  </template>
  
  <script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  import {
    ShoppingCartIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    SunIcon,
    MoonIcon,
  } from '@heroicons/vue/24/outline'
  import { useUserStore } from "@/stores/useUserStore"
  import { useI18n } from 'vue-i18n'
  import LanguageSwitcher from '@/components/UI/LanguageSwitcher.vue'
  import { useDark, useToggle } from "@vueuse/core"
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'

  const { t, locale } = useI18n();
  const userStore = useUserStore()
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const router = useRouter()
  
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
        userStore.logout()
        router.push("/")
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }
  </script>