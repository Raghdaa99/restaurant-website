<template>
  <section class="py-8 md:py-12 px-8 md:px-16 lg:px-32 xl:px-48 bg-gray-50" :class="$darkClass">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 dark:text-white">{{ $t("our_categories") }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
        <div
          v-for="category in categories"
          :key="category.name[locale]"
          class="group relative overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <!-- Background Image -->
          <div class="aspect-square w-full relative h-24 sm:h-28 md:h-32">
            <img 
              :src="category.image" 
              :alt="category.name[locale]"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-2">
              <div class="text-center transform transition-all duration-300 group-hover:translate-y-0">
                <i :class="[category.icon, 'text-lg sm:text-xl text-white mb-1']"></i>
                <h3 class="text-xs sm:text-sm font-bold text-white">{{ category.name[locale] }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchCategories } from '@/services/apiService';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const categories = ref([]);

onMounted(async () => {
  categories.value = await fetchCategories();
});

</script>

<style scoped>
.group:hover i {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

</style> 