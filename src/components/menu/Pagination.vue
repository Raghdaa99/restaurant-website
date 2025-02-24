<template>
      <div class="flex justify-center items-center gap-6">
        <button 
        
          :disabled="currentPage === 1 || paginatedItems.length === 0"
          @click="$emit('update:currentPage', currentPage - 1)"
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
          :disabled="currentPage === totalPages || paginatedItems.length === 0"
          @click="$emit('update:currentPage', currentPage + 1)"
          class="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  paginatedItems: any[];
}>();

defineEmits<{
  (e: 'update:currentPage', value: number): void;
}>();
</script>

