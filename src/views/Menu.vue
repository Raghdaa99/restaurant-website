<template>
  <div class="min-h-screen bg-gray-50 mt-48 font-salsa" :class="$darkClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header Section -->
      <Header />

      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105',
                selectedCategory == category.id
                  ? 'bg-primary text-white shadow-md hover:bg-primary'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
              @click="selectCategory(category.id)"
            >
              {{ category.name[locale] }}
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
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <FoodCard v-for="item in paginatedItems" :key="item.id" :food="item" />
      </div>

      <!-- Empty State -->
      <EmptyState v-if="paginatedItems.length === 0" />

      <!-- Pagination -->
      <Pagination v-if="paginatedItems.length > 0"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :paginatedItems="paginatedItems"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import Header from "@/components/menu/HeaderSection.vue";
import EmptyState from "@/components/menu/EmptyState.vue";
import Pagination from "@/components/menu/Pagination.vue";
import FoodCard from "@/components/Home/FoodCard.vue";
import { fetchCategories, fetchFoods } from "@/services/apiService";
import { useI18n } from 'vue-i18n';
import type { Food } from "@/types/food";

const { locale } = useI18n();

const categories = ref([]);
const menuItems = ref([]);

onMounted(async () => {
  try {
    categories.value = await fetchCategories();
    menuItems.value = await fetchFoods();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

const selectedCategory = ref(1);
const priceRange = ref("all");
const currentPage = ref(1);
const itemsPerPage = 8;

const filteredItems = computed(() => {
  return menuItems.value.filter((item: Food) => {
    const categoryMatch =
      !selectedCategory.value || (item.category && item.category.id === Number(selectedCategory.value));

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

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

watch(filteredItems, (items) => {
  if (items.length === 0) {
    currentPage.value = 0;
  } else if (currentPage.value === 0) {
    currentPage.value = 1;
  }
});

watch(priceRange, () => {
  currentPage.value = 1;
});

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