<template>
  <div
    name="menu-items"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
      <div class="relative">
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute top-4 right-4">
          <span
            class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-500"
          >
            ${{ item.price }}
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-gray-900">{{ item.name }}</h3>
          <span
            class="px-3 py-1 bg-primary text-primary-700 rounded-full text-sm font-medium"
          >
            {{ item.category }}
          </span>
        </div>
        <p class="text-gray-600 mb-6 line-clamp-2">{{ item.description }}</p>
        <button
          class="w-full py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 transform hover:bg-primary-600 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Add to Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import menuItems from '@/data/menuData.ts'

const props = defineProps<{
  items: Array<any>; // Replace 'any' with your actual menu item type
}>();
</script>
