<template>
  <div class="flex flex-col space-y-2">
    <label class="font-medium text-lg text-gray-700">{{ label }}</label>
    <input
      :type="type"
      class="px-4 py-2 border-gray-300 border rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all placeholder-gray-500"
      :class="{ 'border-red-500': error }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
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
  modelValue: String,
  error: String,
});

defineEmits(['update:modelValue', 'blur']);
</script>
