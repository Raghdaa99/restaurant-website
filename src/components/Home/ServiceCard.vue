<template>
  <div class="flex flex-col items-center p-6" :class="$darkClass">
    <component :is="icon" class="w-32 h-32 text-primary"/>
    <h3 class="font-semibold text-xl text-primary mt-4">{{ title[locale] }}</h3>
    <p class="text-lg text-gray-700 mt-4 text-center dark:text-gray-300">{{ description[locale] }}</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();


interface ServiceProps {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  icon: any;
}
defineProps<ServiceProps>();
</script>
