<template>
  <div class="flex flex-col space-y-2">
    <label class="font-medium text-lg text-gray-700">{{ label }}</label>
    <input
      :type="type"
      class="px-4 py-2 border border-primary rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all placeholder-gray-500"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
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
  modelValue: String,
});

defineEmits(['update:modelValue', 'blur']);
</script>
