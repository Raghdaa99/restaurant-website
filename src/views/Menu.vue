<template>
  <div class="min-h-screen bg-gray-50 mt-48 font-salsa" :class="$darkClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header Section -->
      <Header />

      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center gap-6"
        >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105',
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md hover:bg-primary'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-gray-700 font-medium">Price Range:</label>
            <select
              v-model="priceRange"
              class="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            >
              <option value="all">All Prices</option>
              <option value="low">$0 - $10</option>
              <option value="medium">$11 - $20</option>
              <option value="high">$20+</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Menu Items Grid -->
      <MenuCard :items="paginatedItems" />
      <!-- Empty State -->
      <EmptyState :items="paginatedItems.length" />

      <!-- Pagination -->
      <Pagination
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :paginatedItems="paginatedItems"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import pizza from "@/assets/images/foods/pizza.jpg";
import Header from "@/components/menu/HeaderSection.vue";
import MenuCard from "@/components/menu/MenuCard.vue";
import EmptyState from "@/components/menu/EmptyState.vue";
import Pagination from "@/components/menu/Pagination.vue";
import menuItems from "@/data/menuData.ts";

// Categories
const categories = ["All", "Pizza", "Burger", "Pasta", "Salads", "Desserts"];
const selectedCategory = ref("All");
const priceRange = ref("all");
const currentPage = ref(1);
const itemsPerPage = 9;

// Filtered items based on category and price
const filteredItems = computed(() => {
  return menuItems.value.filter((item) => {
    const categoryMatch =
      selectedCategory.value === "All" ||
      item.category === selectedCategory.value;
    const priceMatch = (() => {
      switch (priceRange.value) {
        case "low":
          return item.price <= 10;
        case "medium":
          return item.price > 10 && item.price <= 20;
        case "high":
          return item.price > 20;
        default:
          return true;
      }
    })();
    return categoryMatch && priceMatch;
  });
});

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage)
);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

// Watch filtered items and update currentPage
watch(filteredItems, (items) => {
  if (items.length === 0) {
    currentPage.value = 0;
  } else if (currentPage.value === 0) {
    currentPage.value = 1;
  }
});

// Methods
const selectCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};
</script>

<style>
.menu-items-enter-active,
.menu-items-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-items-enter-from,
.menu-items-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.menu-items-move {
  transition: transform 0.5s ease;
}
</style>
