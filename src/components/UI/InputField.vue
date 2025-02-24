<template>
  <div class="flex flex-col space-y-2">
    <label class="font-medium text-lg text-gray-700">{{ label }}</label>
    <input
        :type="type"
        class="px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all placeholder:text-gray-400"
        :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
});
</script>

