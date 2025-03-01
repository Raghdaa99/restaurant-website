<template>
  <div class="relative overflow-hidden" :class="$darkClass">
    <BackgroundImages />
    <!-- Cards Section -->
    <div
      class="container mx-auto px-4 sm:px-2 md:px-12 lg:px-16 xl:px-40 py-12 text-center"
    >
      <h2 class="text-3xl font-semibold mb-8 dark:text-white">
        {{ $t("our_special_menu") }}
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <FoodCard
          v-for="(item, index) in foodItems.slice(0, 4)"
          :key="index"
          v-bind="item"
          :food="item"
        />
      </div>
      <!-- View All Button -->
      <div class="mt-8 flex justify-center">
        <a
          href="/menu"
          class="text-lg font-medium text-primary flex items-center group"
        >
          {{ $t("view_all_menu") }}
          <span
            class="ml-2 rtl:mr-2 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2"
          >
            <i :class="arrowIconClass"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import BackgroundImages from "@/components/Home/BackgroundImages.vue";
import FoodCard from "@/components/Home/FoodCard.vue";
import { fetchFoods } from "@/services/apiService";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const foodItems = ref([]);

onMounted(async () => {
  foodItems.value = await fetchFoods();
  console.log(foodItems.value);
});

const arrowIconClass = computed(() =>
  locale.value === "ar" ? "fas fa-arrow-left" : "fas fa-arrow-right"
);
</script>
