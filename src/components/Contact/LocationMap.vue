<template>
  <div :class="containerClass">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d867266.9977728397!2d34.8920761!3d31.88589545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cf2d28866bdd9%3A0xee17a001d166f686!2sPalestine!5e0!3m2!1sen!2s!4v1664353522670!5m2!1sen!2s"
      width="100%"
      height="100%"
      style="border: 0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{

  class?: string;
}>();

const containerClass = computed(() => `w-full h-full rounded-lg overflow-hidden shadow-lg`);
</script>