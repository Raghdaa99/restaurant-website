<template>
  <div class="min-h-screen bg-gray-50 mt-48 font-salsa">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header Section -->
     <Header/>

      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105',
                selectedCategory === category 
                  ? 'bg-primary text-white shadow-md hover:bg-primary'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <transition-group 
        name="menu-items" 
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12"
      >
        <div 
          v-for="item in paginatedItems" 
          :key="item.id" 
          class="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <div class="relative">
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-500">
                ${{ item.price }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-bold text-gray-900">{{ item.name }}</h3>
              <span class="px-3 py-1 bg-primary text-primary-700 rounded-full text-sm font-medium">
                {{ item.category }}
              </span>
            </div>
            <p class="text-gray-600 mb-6 line-clamp-2">{{ item.description }}</p>
            <button class="w-full py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 transform hover:bg-primary-600 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              Add to Order
            </button>
          </div>
        </div>
      </transition-group>

      <!-- Empty State -->
      <div 
        v-if="paginatedItems.length === 0" 
        class="text-center py-12"
      >
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No items found</h3>
        <p class="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-6">
        <button 
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <div class="flex items-center gap-2">
          <span class="px-4 py-2 bg-primary text-primary-700 rounded-lg font-medium">
            {{ currentPage }}
          </span>
          <span class="text-gray-600">of</span>
          <span class="text-gray-900 font-medium">{{ totalPages }}</span>
        </div>
        <button 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import pizza from '@/assets/images/foods/pizza.jpg'
import Header from '@/components/menu/HeaderSection.vue'

// Categories
const categories = ['All', 'Pizza', 'Burger', 'Pasta', 'Salads', 'Desserts'];
const selectedCategory = ref('All');
const priceRange = ref('all');
const currentPage = ref(1);
const itemsPerPage = 8;

// Sample menu items (replace with your actual data)
const menuItems = ref([
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 12.99,
    description: 'Fresh tomatoes, mozzarella, basil',
    image: pizza
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 12.99,
    description: 'Fresh tomatoes, mozzarella, basil',
    image: pizza
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 12.99,
    description: 'Fresh tomatoes, mozzarella, basil',
    image: pizza
  },
  {
    id: 5,
    name: 'Burger grill',
    category: 'Burger',
    price: 30.90,
    description: 'Fresh meat, mozzarella, basil',
    image: pizza
  },
  {
    id: 5,
    name: 'Burger grill',
    category: 'Burger',
    price: 30.90,
    description: 'Fresh meat, mozzarella, basil',
    image: pizza
  },
  {
    id: 5,
    name: 'Burger grill',
    category: 'Burger',
    price: 30.90,
    description: 'Fresh meat, mozzarella, basil',
    image: pizza
  },
  {
    id: 5,
    name: 'Burger grill',
    category: 'Burger',
    price: 30.90,
    description: 'Fresh meat, mozzarella, basil',
    image: pizza
  },
  
  // Add more items here
]);

// Filtered items based on category and price
const filteredItems = computed(() => {
  return menuItems.value.filter(item => {
    const categoryMatch = selectedCategory.value === 'All' || item.category === selectedCategory.value;
    const priceMatch = (() => {
      switch (priceRange.value) {
        case 'low': return item.price <= 10;
        case 'medium': return item.price > 10 && item.price <= 20;
        case 'high': return item.price > 20;
        default: return true;
      }
    })();
    return categoryMatch && priceMatch;
  });
});

// Pagination
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

// Methods
const selectCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1; // Reset to first page when changing category
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